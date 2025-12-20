import type { ErrorTemplate } from '.'

export default [
  // 글상자에 효과 적용
  (error, scope) => {
    if (['hue', 'hsv', 'brightness', 'alpha'].every(v => !error.message.includes(v))) return

    const isRelative = ['set_effect_volume', 'add_effect_amount'].includes(scope.type!)
    if (!isRelative && !['set_effect', 'change_effect_amount'].includes(scope.type!)) return

    if (!scope.entity) return Lang.Blocks.entityIsUndefined

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
    if (!scope.entity) return Lang.Blocks.entityIsUndefined

    const direction = scope.getStringField('DRIECTION')
    const directionMap = Lang.Blocks.directions
    const directionText = directionMap[direction as keyof typeof directionMap]

    return Lang.Blocks.canNotChangeShapeOfTextBox(scope.entity.parent.name, directionText)
  },
] satisfies ErrorTemplate[]
