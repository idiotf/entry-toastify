import type { ErrorTemplate } from '.'

export default [
  // '대상 없음' 신호
  (error, scope) => {
    if (error.message != 'value can not be null or undefined') return

    if (scope.type == 'message_cast_wait')
      return Lang.Blocks.valueCanNotBeNullOrUndefinedWait
    else
      return Lang.Blocks.valueCanNotBeNullOrUndefined
  },
] satisfies ErrorTemplate[]
