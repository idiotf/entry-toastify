import type { Lang, LanguagePack } from '.'

export default (Lang: Lang) => {
  const none = Lang.Blocks.no_target

  return {
    Blocks: {
      entityIsUndefined: `실행하는 주체가 '${none}'입니다.\n함수의 결괏값으로 다른 함수를 사용한 것으로 보입니다.`,

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

      // 생김새 카테고리
      canNotChangeShapeOfTextBox: (name, direction) => `'${name}'은(는) 글상자이므로 ${direction} 모양으로 바꿀 수 없습니다.`,
      directions: {
        next: Lang.Blocks.LOOKS_change_shape_next,
        prev: Lang.Blocks.LOOKS_change_shape_prev,
      },

      canNotAddEffectToTextBox: (name, effect, value) => `'${name}'은(는) 글상자이므로 ${effect} 효과를 ${value}만큼 줄 수 없습니다.`,
      canNotApplyEffectToTextBox: (name, effect, value) => `'${name}'은(는) 글상자이므로 ${effect} 효과를 ${value}(으)로 정할 수 없습니다.`,
      effects: {
        color: Lang.Blocks.color,
        brightness: Lang.Blocks.brightness,
        opacity: Lang.Blocks.opacity,
        transparency: Lang.Blocks.transparency,
      },

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

      canNotShowVariable: `'${none}' 변수를 보일 수 없습니다.`,
      canNotHideVariable: `'${none}' 변수를 숨길 수 없습니다.`,

      canNotReadValueFromArray: (listName, index) => `'${listName ?? none}' 리스트에 없는 ${index}번째 항목을 읽을 수 없습니다.`,
      canNotGetLengthOfList: `'${none}' 리스트의 항목 수를 구할 수 없습니다.`,

      canNotAddValueToArray: value => `'${value}' 항목을 '${none}' 리스트에 추가할 수 없습니다.`,
      canNotInsertValueToArray: (listName, index, data) => `'${data}' 항목을 '${listName ?? none}' 리스트의 ${index}번째에 넣을 수 없습니다.`,
      canNotChangeValueFromArray: (listName, index, data) => `'${listName ?? none}' 리스트의 ${index}번째 항목을 '${data}'(으)로 바꿀 수 없습니다.`,
      canNotRemoveValueFromArray: (listName, index) => `'${listName ?? none}' 리스트에 없는 ${index}번째 항목을 삭제할 수 없습니다.`,

      canNotShowList: `'${none}' 리스트를 보일 수 없습니다.`,
      canNotHideList: `'${none}' 리스트를 숨길 수 없습니다.`,

      // 함수 카테고리
      canNotGetFuncVariable: `'${none}' 지역변수의 값을 구할 수 없습니다.`,
      canNotSetFuncVariable: value => `'${none}' 지역변수를 '${value}'(으)로 정할 수 없습니다.`,

      // 데이터분석 카테고리
      canNotAppendRowToTable: `테이블 '${none}'에 행을 추가할 수 없습니다.`,
      canNotAppendColToTable: `테이블 '${none}'에 열을 추가할 수 없습니다.`,

      canNotInsertRowToTable: number => `테이블 '${none}'의 ${number}번째 위치에 행을 추가할 수 없습니다.`,
      canNotInsertColToTable: number => `테이블 '${none}'의 ${number}번째 위치에 열을 추가할 수 없습니다.`,

      canNotDeleteRowFromTable: number => `테이블 '${none}'의 ${number}번째 행을 삭제할 수 없습니다.`,
      canNotDeleteColFromTable: number => `테이블 '${none}'의 ${number}번째 열을 삭제할 수 없습니다.`,

      canNotSetValueFromTable: (number, value) => `테이블 '${none}'의 ${number}번째 행에 있는 값을 '${value}'(으)로 바꿀 수 없습니다.`,
      canNotSetValueFromCell: (cell, value) => `테이블 '${none}'의 ${cell} 셀 값을 '${value}'(으)로 설정할 수 없습니다.`,
      canNotSaveCurrentTable: `테이블 '${none}'을 현재 상태로 저장할 수 없습니다.`,

      canNotGetRowCount: `테이블 '${none}'의 행 개수를 구할 수 없습니다.`,
      canNotGetColCount: `테이블 '${none}'의 열 개수를 구할 수 없습니다.`,

      canNotGetValueFromTable: row => `테이블 '${none}'의 ${row}번째 행에 있는 값을 구할 수 없습니다.`,
      canNotGetValueFromCell: cell => `테이블 '${none}'의 ${cell} 셀 값을 구할 수 없습니다.`,
      canNotGetValueFromLastRow: `테이블 '${none}'의 마지막 행에 있는 값을 구할 수 없습니다.`,

      canNotCalcValuesFromTable: calc => `테이블 '${none}' 열의 ${calc} 구할 수 없습니다.`,
      tableCalcValues: {
        SUM: Lang.Blocks.table_sum + '을',
        MAX: Lang.Blocks.table_max + '를',
        MIN: Lang.Blocks.table_min + '를',
        AVG: Lang.Blocks.table_avg + '을',
        STDEV: Lang.Blocks.table_stdev + '를',
        MEDIAN: Lang.Blocks.table_median + '을',
      },

      canNotGetCoefficient: `테이블 '${none}'의 상관계수를 구할 수 없습니다.`,
      canNotVLookupTable: value => `테이블 '${none}'에서 '${value}'와 같은 값을 가진 행을 찾을 수 없습니다.`,
    },
  } satisfies LanguagePack
}
