import type * as Entry from './types'
import { templates } from './blocks'
import { setLanguage } from './lang'

declare global {
  var Entry: typeof import('./types')
  var Lang: typeof import('./types/lang')
}

(async () => {

const { Entry, Lang } = await new Promise<typeof globalThis>(resolve => {
  if ('Entry' in self && 'Lang' in self) return resolve(self)

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

function onCatch(scope: Entry.Scope, e: unknown): never {
  if (typeof e != 'object' || !e || !errorSet.has(e)) {
    lastError = parseError(e, lastThrownScope = scope)
    if (typeof e == 'object' && e) errorSet.add(e)
  }
  throw e
}

Entry.Scope.prototype.run = (run => function(entity, isValue) {
  try {
    const v = run.call(this, entity, isValue)
    if (v instanceof Promise) return v.catch(e => onCatch(this, e))
    return v
  } catch (e) {
    onCatch(this, e)
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
  if ('toast' in Entry) return resolve(Entry)

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
