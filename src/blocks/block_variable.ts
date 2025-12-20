import type { ErrorTemplate } from '.'

export default [
  // 빈 문자열 묻고 대답 기다리기
  error => {
    if (error.message != 'message can not be empty') return
    return Lang.Blocks.messageCanNotBeEmpty
  },

  // '대상 없음' 변수의 값
  (error, scope) => {
    if (scope.type != 'get_variable' || !error.message.includes('getValue')) return
    return Lang.Blocks.canNotGetVariable
  },

  // '대상 없음' 변수에 값 더하기
  (error, scope) => {
    if (scope.type != 'change_variable' || !error.message.includes('isRealTime_')) return

    const value = scope.getValue('VALUE')
    return Lang.Blocks.canNotChangeVariable(value)
  },

  // '대상 없음' 변수의 값 정하기
  (error, scope) => {
    if (scope.type != 'set_variable' || !error.message.includes('isRealTime_')) return

    const value = scope.getValue('VALUE')
    return Lang.Blocks.canNotSetVariable(value)
  },

  // 변수/리스트 '대상 없음' 보이기/숨기기
  (error, scope) => {
    if (!error.message.includes('setVisible')) return

    switch (scope.type) {
      case 'show_variable':
        return Lang.Blocks.canNotShowVariable

      case 'hide_variable':
        return Lang.Blocks.canNotHideVariable

      case 'show_list':
        return Lang.Blocks.canNotShowList

      case 'hide_list':
        return Lang.Blocks.canNotHideList
    }
  },

  // '대상 없음' 리스트에 항목 추가
  (error, scope) => {
    if (scope.type != 'add_value_to_list' || !error.message.includes('isCloud_')) return

    const value = scope.getValue('VALUE')
    return Lang.Blocks.canNotAddValueToArray(value)
  },

  // '대상 없음' 리스트에 접근
  (error, scope) => {
    if (!error.message.includes('getArray')) return

    switch (scope.type) {
      case 'value_of_index_from_list': {
        const index = scope.getValue('INDEX')
        return Lang.Blocks.canNotReadValueFromArray(null, index)
      }

      case 'insert_value_to_list': {
        const [data, index] = scope.getValues(['DATA', 'INDEX'])
        return Lang.Blocks.canNotInsertValueToArray(null, index, data)
      }

      case 'change_value_list_index': {
        const [data, index] = scope.getValues(['DATA', 'INDEX'])
        return Lang.Blocks.canNotChangeValueFromArray(null, index, data)
      }

      case 'remove_value_from_list': {
        const index = scope.getValue('VALUE')
        return Lang.Blocks.canNotRemoveValueFromArray(null, index)
      }

      case 'length_of_list':
        return Lang.Blocks.canNotGetLengthOfList
    }
  },

  // 리스트의 범위를 벗어난 항목 접근
  (error, scope) => {
    if (error.message != 'can not insert value to array' && !error.message.includes('data')) return

    const listId = scope.getStringField('LIST')
    const index = scope.getValue('INDEX')
    const listName = Entry.variableContainer.getList(listId)?.getName()

    switch (scope.type) {
      case 'value_of_index_from_list':
        return Lang.Blocks.canNotReadValueFromArray(listName, index)

      case 'insert_value_to_list': {
        const data = scope.getValue('DATA')
        return Lang.Blocks.canNotInsertValueToArray(listName, index, data)
      }

      case 'change_value_list_index': {
        const data = scope.getValue('DATA')
        return Lang.Blocks.canNotChangeValueFromArray(listName, index, data)
      }
    }
  },

  // 리스트의 범위를 벗어난 항목 삭제
  (error, scope) => {
    if (error.message != 'can not remove value from array') return

    const listId = scope.getStringField('LIST')
    const index = scope.getValue('VALUE')
    const listName = Entry.variableContainer.getList(listId)?.getName()

    return Lang.Blocks.canNotRemoveValueFromArray(listName, index)
  },
] satisfies ErrorTemplate[]
