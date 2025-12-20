import type { ErrorTemplate } from '.'

export default [
  // '대상 없음' 지역변수의 값
  (error, scope) => {
    if (scope.type != 'get_func_variable' || !error.message.includes('getValue')) return
    return Lang.Blocks.canNotGetFuncVariable
  },

  // '대상 없음' 지역변수의 값 정하기
  (error, scope) => {
    if (scope.type != 'set_func_variable' || !error.message.includes('setValue')) return

    const value = scope.getValue('VALUE')
    return Lang.Blocks.canNotSetFuncVariable(value)
  },
] satisfies ErrorTemplate[]
