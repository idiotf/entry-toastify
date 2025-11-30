import type { Lang, LanguagePack } from '.'

export default (Lang: Lang) => {
  const none = Lang.Blocks.no_target

  return {
    Blocks: {
      // 시작 카테고리
      valueCanNotBeNullOrUndefined: `'${none}' 신호를 보낼 수 없습니다.`,
      valueCanNotBeNullOrUndefinedWait: `'${none}' 신호를 보내고 기다릴 수 없습니다.`,

      // 흐름 카테고리
      canNotRepeatCountNegative: iterNumber => `${iterNumber}번 반복할 수 없습니다.`,
      canNotCreateClone: `'${none}'의 복제본을 생성할 수 없습니다.`,

      // 움직임 카테고리
      canNotLocate: `'${none}' 오브젝트의 위치로 이동할 수 없습니다.`,
      canNotLocateTime: time => `'${none}' 오브젝트의 위치로 ${time}초 동안 이동할 수 없습니다.`,
      canNotSeeAngleObject: `'${none}' 오브젝트 쪽을 바라볼 수 없습니다.`,

      // 글상자 카테고리
      canNotReadText: name => `글상자가 아닌 오브젝트 '${name}'의 내용을 읽을 수 없습니다.`,

      // 판단 카테고리
      canNotReachSomething: `'${none}' 오브젝트에 닿았는지 감지할 수 없습니다.`,

      // 계산 카테고리
      canNotCoordinateObject: targetStr => `'${none}'의 ${targetStr} 읽을 수 없습니다.`,
      coordinateTargets: {
        x:             Lang.Blocks.CALC_coordinate_x_value         + '을',
        y:             Lang.Blocks.CALC_coordinate_y_value         + '을',
        rotation:      Lang.Blocks.CALC_coordinate_rotation_value  + '을',
        direction:     Lang.Blocks.CALC_coordinate_direction_value + '을',
        size:          Lang.Blocks.CALC_coordinate_size_value      + '를',
        picture_index: Lang.Blocks.CALC_picture_index              + '를',
        picture_name:  Lang.Blocks.CALC_picture_name               + '을',
      },

      canNotCalcOperation: (value, operation) => `${value}은(는) ${operation}의 정의역(-1~1)을 벗어났습니다.`,
      canNotCalcFactorial: value => `${value}은(는) 음이 아닌 정수가 아니므로 팩토리얼을 구할 수 없습니다.`,
      operations: {
        asin_radian: Lang.Blocks.CALC_calc_operation_asin,
        acos_radian: Lang.Blocks.CALC_calc_operation_acos,
      },

      canNotReadCharAt: (string, index) => `'${string}'의 범위를 벗어난 ${index}번째 글자를 읽을 수 없습니다.`,
      canNotSubstring: (string, start, end) => `'${string}'의 범위를 벗어난 ${start}~${end}번째 글자를 읽을 수 없습니다.`,

      // 자료 카테고리
      messageCanNotBeEmpty: `빈 문자열을 묻고 대답을 기다릴 수 없습니다.`,

      canNotGetVariable: `'${none}' 변수의 값을 구할 수 없습니다.`,
      canNotChangeVariable: value => `'${none}' 변수에 '${value}'만큼 더할 수 없습니다.`,
      canNotSetVariable: value => `'${none}' 변수를 '${value}'(으)로 정할 수 없습니다.`,

      canNotReadValueFromArray: (listName, index) => `'${listName || none}' 리스트에 없는 ${index}번째 항목을 읽을 수 없습니다.`,
      canNotInsertValueToArray: (listName, index, data) => `'${data}' 항목을 '${listName || none}' 리스트의 ${index}번째에 넣을 수 없습니다.`,
      canNotChangeValueFromArray: (listName, index, data) => `'${listName || none}' 리스트의 ${index}번째 항목을 '${data}'으로 바꿀 수 없습니다.`,
      canNotRemoveValueFromArray: (listName, index) => `'${listName || none}' 리스트에 없는 ${index}번째 항목을 삭제할 수 없습니다.`,

      // 함수 카테고리
      canNotGetFuncVariable: `'${none}' 지역변수의 값을 구할 수 없습니다.`,
      canNotSetFuncVariable: value => `'${none}' 지역변수를 '${value}'(으)로 정할 수 없습니다.`,
    },
  } satisfies LanguagePack
}
