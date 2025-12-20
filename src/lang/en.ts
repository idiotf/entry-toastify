import type { Lang, LanguagePack } from '.'

export default (Lang: Lang) => {
  const none = Lang.Blocks.no_target

  return {
    Blocks: {
      entityIsUndefined: `The executing entity is '${none}'.\nIt seems that a function was used as the return value of another function.`,

      // 시작 카테고리
      valueCanNotBeNullOrUndefined: `Cannot send the '${none}' signal.`,
      valueCanNotBeNullOrUndefinedWait: `Cannot send the '${none}' signal and wait.`,

      // 흐름 카테고리
      canNotRepeatCountNegative: iterNumber => `Cannot repeat ${iterNumber} times.`,
      canNotCreateClone: `Cannot create a clone of '${none}'.`,

      // 움직임 카테고리
      canNotLocate: `Cannot move to the position of '${none}'.`,
      canNotLocateTime: time => `Cannot move to the position of '${none}' for ${time} seconds.`,
      canNotSeeAngleObject: `Cannot turn toward '${none}'.`,

      // 생김새 카테고리
      canNotChangeShapeOfTextBox: (name, direction) => `Cannot change to ${direction} shape because '${name}' is a text box.`,
      directions: {
        next: Lang.Blocks.LOOKS_change_shape_next,
        prev: Lang.Blocks.LOOKS_change_shape_prev,
      },

      canNotAddEffectToTextBox: (name, effect, value) => `Cannot change the ${effect} effect of '${name}' by ${value} because it is a text box.`,
      canNotApplyEffectToTextBox: (name, effect, value) => `Cannot set the ${effect} effect of '${name}' to ${value} because it is a text box.`,
      effects: {
        color: Lang.Blocks.color,
        brightness: Lang.Blocks.brightness,
        opacity: Lang.Blocks.opacity,
        transparency: Lang.Blocks.transparency,
      },

      // 글상자 카테고리
      canNotReadText: name => `Cannot read the text of '${name}' because it is not a text box.`,

      // 판단 카테고리
      canNotReachSomething: `Cannot detect collision with '${none}'.`,

      // 계산 카테고리
      canNotCoordinateObject: targetStr => `Cannot read the ${targetStr} of '${none}'.`,
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

      canNotReadCharAt: (string, index) => `Cannot read the ${index}th letter of '${string}' (out of range).`,
      canNotSubstring: (string, start, end) => `Cannot read substring of '${string}' from ${start} to ${end} (out of range).`,

      // 자료 카테고리
      messageCanNotBeEmpty: `Cannot ask and wait with an empty string.`,

      canNotGetVariable: `Cannot get the value of variable '${none}'.`,
      canNotChangeVariable: value => `Cannot add to variable '${none}' by '${value}'.`,
      canNotSetVariable: value => `Cannot set variable '${none}' to '${value}'.`,

      canNotShowVariable: `Cannot show variable '${none}'.`,
      canNotHideVariable: `Cannot hide variable '${none}'.`,

      canNotReadValueFromArray: (listName, index) => `Cannot read the ${index}th item of list '${listName ?? none}' (out of range).`,
      canNotGetLengthOfList: `Cannot get the number of items in list '${none}'.`,

      canNotAddValueToArray: value => `Cannot add '${value}' to list '${none}'.`,
      canNotInsertValueToArray: (listName, index, data) => `Cannot insert '${data}' at ${index}th position of list '${listName ?? none}'.`,
      canNotChangeValueFromArray: (listName, index, data) => `Cannot replace the ${index}th item of list '${listName ?? none}' to '${data}'.`,
      canNotRemoveValueFromArray: (listName, index) => `Cannot remove the ${index}th item of list '${listName ?? none}' (out of range).`,

      canNotShowList: `Cannot show list '${none}'.`,
      canNotHideList: `Cannot hide list '${none}'.`,

      // 함수 카테고리
      canNotGetFuncVariable: `Cannot get the value of local variable '${none}'.`,
      canNotSetFuncVariable: value => `Cannot set local variable '${none}' to '${value}'.`,

      // 데이터분석 카테고리
      canNotAppendRowToTable: `Cannot add a row to table '${none}'.`,
      canNotAppendColToTable: `Cannot add a column to table '${none}'.`,

      canNotInsertRowToTable: number => `Cannot insert a row at position ${number} in table '${none}'.`,
      canNotInsertColToTable: number => `Cannot insert a column at position ${number} in table '${none}'.`,

      canNotDeleteRowFromTable: number => `Cannot delete row ${number} from table '${none}'.`,
      canNotDeleteColFromTable: number => `Cannot delete column ${number} from table '${none}'.`,

      canNotSetValueFromTable: (row, value) => `Cannot set the value in row ${row} of table '${none}' to '${value}'.`,
      canNotSaveCurrentTable: `Cannot save the current state of table '${none}'.`,
      canNotSetValueFromCell: (cell, value) => `Cannot set the value of cell ${cell} in table '${none}' to '${value}'.`,

      canNotGetRowCount: `Cannot get the number of rows in table '${none}'.`,
      canNotGetColCount: `Cannot get the number of columns in table '${none}'.`,

      canNotGetValueFromTable: row => `Cannot get the value from row ${row} in table '${none}'.`,
      canNotGetValueFromCell: cell => `Cannot get the value of cell ${cell} in table '${none}'.`,
      canNotGetValueFromLastRow: `Cannot get the value from the last row of table '${none}'.`,

      canNotCalcValuesFromTable: calc => `Cannot calculate ${calc} of the column in table '${none}'.`,
      tableCalcValues: {
        SUM:    Lang.Blocks.table_sum,
        MAX:    Lang.Blocks.table_max,
        MIN:    Lang.Blocks.table_min,
        AVG:    Lang.Blocks.table_avg,
        STDEV:  Lang.Blocks.table_stdev,
        MEDIAN: Lang.Blocks.table_median,
      },

      canNotGetCoefficient: `Cannot calculate the correlation coefficient of table '${none}'.`,
      canNotVLookupTable: value => `Cannot find a row in table '${none}' that matches '${value}'.`,
    },
  } satisfies LanguagePack
}
