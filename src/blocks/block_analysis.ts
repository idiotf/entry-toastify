import type { ErrorTemplate } from '.'

export default [
  // 테이블 '대상 없음'에 행/열 추가하기
  (error, scope) => {
    if (scope.type != 'append_row_to_table') return

    const isRow = error.message.includes('appendRow')
    if (!isRow && !error.message.includes('appendCol')) return

    return isRow ? Lang.Blocks.canNotAppendRowToTable
                 : Lang.Blocks.canNotAppendColToTable
  },

  // 테이블 '대상 없음' n번째에 행/열 추가하기
  (error, scope) => {
    if (scope.type != 'insert_row_to_table') return

    const isRow = error.message.includes('insertRow')
    if (!isRow && !error.message.includes('insertCol')) return

    const number = scope.getValue('NUMBER')
    return isRow ? Lang.Blocks.canNotInsertRowToTable(number)
                 : Lang.Blocks.canNotInsertColToTable(number)
  },

  // 테이블 '대상 없음' n번째 행/열 삭제하기
  (error, scope) => {
    if (scope.type != 'delete_row_from_table') return

    const isRow = error.message.includes('deleteRow')
    if (!isRow && !error.message.includes('deleteCol')) return

    const number = scope.getValue('NUMBER')
    return isRow ? Lang.Blocks.canNotDeleteRowFromTable(number)
                 : Lang.Blocks.canNotDeleteColFromTable(number)
  },

  // 테이블 '대상 없음'의 셀 접근
  (error, scope) => {
    if (!error.message.includes('isExist')) return

    switch (scope.type) {
      case 'set_value_from_table': {
        const [number, value] = scope.getValues(['NUMBER', 'VALUE'])
        return Lang.Blocks.canNotSetValueFromTable(number, value)
      }

      case 'set_value_from_cell': {
        const [cell, value] = scope.getValues(['CELL', 'VALUE'])
        return Lang.Blocks.canNotSetValueFromCell(cell, value)
      }

      case 'get_value_from_table': {
        const row = scope.getValue('ROW')
        return Lang.Blocks.canNotGetValueFromTable(row)
      }

      case 'get_value_from_cell': {
        const cell = scope.getValue('CELL')
        return Lang.Blocks.canNotGetValueFromCell(cell)
      }

      case 'get_value_from_last_row':
        return Lang.Blocks.canNotGetValueFromLastRow
    }
  },

  // 테이블 '대상 없음'을 현재 상태로 남기기
  (error, scope) => {
    if (scope.type != 'save_current_table' || !error.message.includes('dataTable')) return
    return Lang.Blocks.canNotSaveCurrentTable
  },

  // 테이블 '대상 없음'의 행/열 개수
  (error, scope) => {
    if (scope.type != 'get_table_count') return
    
    const isRow = error.message.includes('array')
    if (!isRow && !error.message.includes('fields')) return

    return isRow ? Lang.Blocks.canNotGetRowCount
                 : Lang.Blocks.canNotGetColCount
  },

  // 테이블 '대상 없음' 열의 통계
  (error, scope) => {
    if (scope.type != 'calc_values_from_table' || !error.message.includes('array')) return

    const calcField = scope.getField('CALC')
    const tableCalcMap = Lang.Blocks.tableCalcValues
    const calc = tableCalcMap[calcField as keyof typeof tableCalcMap]

    return Lang.Blocks.canNotCalcValuesFromTable(calc)
  },

  // 테이블 '대상 없음'의 상관계수
  (error, scope) => {
    if (scope.type != 'get_coefficient' || !error.message.includes('getCoefficient')) return
    return Lang.Blocks.canNotGetCoefficient
  },

  // 테이블 '대상 없음'의 열이 ~인 행의 열 값
  (error, scope) => {
    if (scope.type != 'get_value_v_lookup') return

    // 최근 entryjs 커밋에 origin 미사용 버전으로 바뀌었지만,
    // 웹에는 배포 여부 불확실하므로 기존과 새 방식 모두 체크
    if (!error.message.includes('origin') && !error.message.includes('isExist')) return

    const value = scope.getValue('VALUE')
    return Lang.Blocks.canNotVLookupTable(value)
  },
] satisfies ErrorTemplate[]
