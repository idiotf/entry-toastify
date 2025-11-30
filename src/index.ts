import type * as Entry from './entry'
import { setLanguage, templates } from './templates'

declare global {
  var Entry: typeof import('./entry')
  var Lang: typeof import('./entry/lang')
}

(async () => {

const { Entry, Lang } = await new Promise<typeof globalThis>(resolve => {
  const interval = setInterval(() => {
    if ('Entry' in self && 'Lang' in self) {
      resolve(self)
      clearInterval(interval)
    }
  }, 50)
})

let lastError: string | undefined
let lastThrownScope: Entry.Scope | null = null
let capturedError: string | undefined
let isCaptured = false

function parseError(error: unknown, scope: Entry.Scope) {
  if (!(error instanceof Error))
    return Lang.Workspace.check_runtime_error

  for (const template of templates) try {
    const message = template(error, scope)
    if (message) return `${message}\n${Lang.Workspace.check_runtime_error}`
  } catch (e) {
    console.error(e)
  }

  return Lang.Workspace.check_runtime_error
}

const errorSet = new WeakSet

Entry.Scope.prototype.run = (run => function(entity, isValue) {
  try {
    return run.call(this, entity, isValue)
  } catch (e) {
    if (typeof e != 'object' || !e || !errorSet.has(e)) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      lastError = parseError(e, lastThrownScope = this)
      if (typeof e == 'object' && e) errorSet.add(e)
    }
    throw e
  }
})(Entry.Scope.prototype.run)

Entry.Utils.stopProjectWithToast = (stopProjectWithToast => (scope, message, error) => {
  if (!isCaptured) {
    capturedError = lastError
    isCaptured = true
    queueMicrotask(() => isCaptured = false)
  }

  if ('funcExecutor' in scope) return stopProjectWithToast({
    type: scope.type,
    funcExecutor: {
      scope: lastThrownScope,
    },
  } as unknown as Entry.Scope, message, error)

  return stopProjectWithToast(lastThrownScope || scope, message, error)
})(Entry.Utils.stopProjectWithToast)

Entry.moduleManager?.setLanguageTemplates({ setLanguage })

const { toast } = await new Promise<typeof Entry>(resolve => {
  const interval = setInterval(() => {
    if ('toast' in Entry) {
      resolve(Entry)
      clearInterval(interval)
    }
  }, 50)
})

toast.alert = (alert => function(title, message, isNotAutoDispose) {
  if (capturedError && message == Lang.Workspace.check_runtime_error)
    return alert.call(this, title, capturedError, isNotAutoDispose)

  return alert.call(this, title, message, isNotAutoDispose)
})(toast.alert)

})()
