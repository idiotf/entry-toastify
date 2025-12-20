import type { ErrorTemplate } from '.'

export default [
  // 음수 번 반복
  (_error, scope) => {
    if (scope.type != 'repeat_basic') return

    const iterNumber = scope.getNumberValue('VALUE')
    return Lang.Blocks.canNotRepeatCountNegative(iterNumber)
  },

  // '대상 없음'의 복제본
  (error, scope) => {
    if (scope.type != 'create_clone' || !error.message.includes('addCloneEntity')) return

    const targetSpriteId = scope.getField('VALUE')
    if (targetSpriteId == 'self') return Lang.Blocks.entityIsUndefined

    return Lang.Blocks.canNotCreateClone
  },
] satisfies ErrorTemplate[]
