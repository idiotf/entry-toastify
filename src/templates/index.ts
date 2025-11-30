import type { Scope } from '../entry'

import ko from './ko'
import en from './en'

interface ErrorTemplate {
  (error: Error, scope: Scope): string | undefined
}

export interface Lang extends Omit<typeof globalThis.Lang, 'Blocks'> {
  Blocks: Record<string, string>
}

export type LanguagePack = Record<string, Record<string, string | ((...args: unknown[]) => string) | object>>

export function setLanguage() {
  const Lang: Lang = globalThis.Lang

  return {
    ko: ko(Lang),
    en: en(Lang),
  }
}

declare const Lang: typeof globalThis.Lang

export const templates: ErrorTemplate[] = [
  // #region 시작 카테고리

  // '대상 없음' 신호
  (error, scope) => {
    if (error.message != 'value can not be null or undefined') return

    if (scope.type == 'message_cast_wait')
      return Lang.Blocks.valueCanNotBeNullOrUndefinedWait
    else
      return Lang.Blocks.valueCanNotBeNullOrUndefined
  },

  // #endregion
  // #region 흐름 카테고리

  // 음수 번 반복
  (_error, scope) => {
    if (scope.type != 'repeat_basic') return

    const iterNumber = scope.getNumberValue('VALUE')
    return Lang.Blocks.canNotRepeatCountNegative(iterNumber)
  },

  // '대상 없음'의 복제본
  (error, scope) => {
    if (scope.type != 'create_clone' || !error.message.includes('addCloneEntity')) return
    return Lang.Blocks.canNotCreateClone
  },

  // #endregion
  // #region 움직임 카테고리

  // '대상 없음' 위치로 이동하거나 바라보기
  (error, scope) => {
    if (!error.message.includes('getX')) return

    switch (scope.type) {
      case 'locate':
        return Lang.Blocks.canNotLocate

      case 'locate_object_time': {
        const time = scope.getNumberValue('VALUE')
        return Lang.Blocks.canNotLocateTime(time)
      }

      case 'see_angle_object':
        return Lang.Blocks.canNotSeeAngleObject
    }
  },

  // #endregion
  // #region 생김새 카테고리

  // 글상자에 효과 적용
  (error, scope) => {
    if (['hue', 'hsv', 'brightness', 'alpha'].every(v => !error.message.includes(v))) return

    const isRelative = ['set_effect_volume', 'add_effect_amount'].includes(scope.type!)
    if (!isRelative && !['set_effect', 'change_effect_amount'].includes(scope.type!)) return

    const effect = scope.getField('EFFECT')
    const value = scope.getNumberValue('VALUE')

    const effectMap = Lang.Blocks.effects
    const effectName = effectMap[effect as keyof typeof effectMap]

    return isRelative
         ? Lang.Blocks.canNotAddEffectToTextBox(scope.entity.parent.name, effectName, value)
         : Lang.Blocks.canNotApplyEffectToTextBox(scope.entity.parent.name, effectName, value)
  },

  // 글상자의 이전/다음 모양으로 바꾸기
  (error, scope) => {
    if (scope.type != 'change_to_next_shape' || !error.message.includes('id')) return

    const direction = scope.getStringField('DRIECTION')
    const directionMap = Lang.Blocks.directions
    const directionText = directionMap[direction as keyof typeof directionMap]

    return Lang.Blocks.canNotChangeShapeOfTextBox(scope.entity.parent.name, directionText)
  },

  // #endregion
  // #region 글상자 카테고리

  // 일반 오브젝트의 글상자 내용 읽기
  (error, scope) => {
    if (error.message != 'textBox가 아닙니다.') return
    return Lang.Blocks.canNotReadText(scope.entity.parent.name)
  },

  // #endregion
  // #region 판단 카테고리

  // '대상 없음'에 닿았는가?
  (error, scope) => {
    if (scope.type != 'reach_something' || !error.message.includes('getVisible')) return
    return Lang.Blocks.canNotReachSomething
  },

  // #endregion
  // #region 계산 카테고리

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

  // #endregion
  // #region 자료 카테고리

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
    if (scope.type != 'change_variable' || !error.message.includes('getValue')) return

    const value = scope.getValue('VALUE')
    return Lang.Blocks.canNotChangeVariable(value)
  },

  // '대상 없음' 변수의 값 정하기
  (error, scope) => {
    if (scope.type != 'set_variable' || !error.message.includes('setValue')) return

    const value = scope.getValue('VALUE')
    return Lang.Blocks.canNotSetVariable(value)
  },

  // 리스트의 범위를 벗어난 항목 접근
  (error, scope) => {
    if (error.message != 'can not insert value to array') return

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

  // #endregion
  // #region 함수 카테고리

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

  // #endregion
]
