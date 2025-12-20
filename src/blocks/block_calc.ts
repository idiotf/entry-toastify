import type { ErrorTemplate } from '.'

export default [
  // '대상 없음'의 좌푯값
  (_error, scope) => {
    if (scope.type != 'coordinate_object') return

    const target = scope.getField('COORDINATE')
    const targetMap = Lang.Blocks.coordinateTargets
    const targetStr = targetMap[target as keyof typeof targetMap]

    return Lang.Blocks.canNotCoordinateObject(targetStr)
  },

  // 잘못된 asin/acos 연산
  (error, scope) => {
    if (scope.type != 'calc_operation' || error.message != 'x range exceeded') return

    const value = scope.getNumberValue('LEFTHAND')
    const operator = scope.getField('VALUE')

    const operationMap = Lang.Blocks.operations
    const operation = operationMap[operator as keyof typeof operationMap]

    return Lang.Blocks.canNotCalcOperation(value, operation)
  },

  // 잘못된 팩토리얼 연산
  (error, scope) => {
    if (scope.type != 'calc_operation' || error.name != 'RangeError') return

    const value = scope.getNumberValue('LEFTHAND')
    return Lang.Blocks.canNotCalcFactorial(value)
  },

  // 범위를 벗어난 글자 가져옴
  (_error, scope) => {
    if (scope.type != 'char_at') return

    const string = scope.getStringValue('LEFTHAND')
    const index = scope.getNumberValue('RIGHTHAND')

    return Lang.Blocks.canNotReadCharAt(string, index)
  },

  // 범위를 벗어난 여러 글자 가져옴
  (_error, scope) => {
    if (scope.type != 'substring') return

    const string = scope.getStringValue('STRING')
    const start = scope.getNumberValue('START')
    const end = scope.getNumberValue('END')

    return Lang.Blocks.canNotSubstring(string, start, end)
  },
] satisfies ErrorTemplate[]
