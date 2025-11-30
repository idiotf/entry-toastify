import type { Lang, LanguagePack } from '.'

export default (Lang: Lang) => {
  const none = Lang.Blocks.no_target

  return {
    Blocks: {
      // 시작 카테고리
      valueCanNotBeNullOrUndefined: `Cannot send '${none}' signal.`,
      valueCanNotBeNullOrUndefinedWait: `Cannot send '${none}' signal and wait.`,

      // 흐름 카테고리
      canNotRepeatCountNegative: iterNumber => `Cannot repeat ${iterNumber} times.`,
      canNotCreateClone: `Cannot create a clone of '${none}'.`,

      // 움직임 카테고리
      canNotLocate: `Cannot move to the position of '${none}'.`,
      canNotLocateTime: time => `Cannot move to the position of '${none}' for ${time} seconds.`,
      canNotSeeAngleObject: `Cannot look toward '${none}'.`,

      // 글상자 카테고리
      canNotReadText: name => `Cannot read text because '${name}' is not a text box.`,

      // 판단 카테고리
      canNotReachSomething: `Cannot detect collision with '${none}'.`,

      // 계산 카테고리
      canNotCoordinateObject: targetStr => `Cannot read ${targetStr} of '${none}'.`,
      coordinateTargets: {
        x:             Lang.Blocks.CALC_coordinate_x_value,
        y:             Lang.Blocks.CALC_coordinate_y_value,
        rotation:      Lang.Blocks.CALC_coordinate_rotation_value,
        direction:     Lang.Blocks.CALC_coordinate_direction_value,
        size:          Lang.Blocks.CALC_coordinate_size_value,
        picture_index: Lang.Blocks.CALC_picture_index,
        picture_name:  Lang.Blocks.CALC_picture_name,
      },

      canNotCalcOperation: (value, operation) => `${value} is outside the domain (-1 to 1) of ${operation}.`,
      canNotCalcFactorial: value => `Cannot compute the factorial of ${value} because it is not a non-negative integer.`,
      operations: {
        asin_radian: Lang.Blocks.CALC_calc_operation_asin,
        acos_radian: Lang.Blocks.CALC_calc_operation_acos,
      },

      canNotReadCharAt: (string, index) => `Cannot read the ${index}th character of '${string}' (out of range).`,
      canNotSubstring: (string, start, end) => `Cannot read characters ${start}–${end} of '${string}' (out of range).`,

      // 자료 카테고리
      messageCanNotBeEmpty: `Cannot ask with an empty string.`,

      canNotGetVariable: `Cannot get value of variable '${none}'.`,
      canNotChangeVariable: value => `Cannot add to '${none}' variable by '${value}'.`,
      canNotSetVariable: value => `Cannot set '${none}' variable to '${value}'.`,

      canNotReadValueFromArray: (listName, index) => `Cannot read the ${index}th item of the list '${listName || none}' (out of range).`,
      canNotInsertValueToArray: (listName, index, data) => `Cannot insert '${data}' into the ${index}th position of the list '${listName || none}'.`,
      canNotChangeValueFromArray: (listName, index, data) => `Cannot change the ${index}th item of the list '${listName || none}' to '${data}'.`,
      canNotRemoveValueFromArray: (listName, index) => `Cannot remove the ${index}th item from the list '${listName || none}' (out of range).`,

      // 함수 카테고리
      canNotGetFuncVariable: `Cannot get value of local variable '${none}'.`,
      canNotSetFuncVariable: value => `Cannot set '${none}' local variable to '${value}'.`,
    },
  } satisfies LanguagePack
}
