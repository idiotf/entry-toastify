import type { ErrorTemplate } from '.'

export default [
  // '대상 없음'에 닿았는가?
  (error, scope) => {
    if (scope.type != 'reach_something' || !error.message.includes('getVisible')) return

    if (!scope.entity) return Lang.Blocks.entityIsUndefined
    return Lang.Blocks.canNotReachSomething
  },
] satisfies ErrorTemplate[]
