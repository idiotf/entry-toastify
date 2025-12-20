import type { ErrorTemplate } from '.'

export default [
  // '대상 없음' 위치로 이동하거나 바라보기
  (error, scope) => {
    if (!error.message.includes('getX')) return
    if (!scope.entity) return Lang.Blocks.entityIsUndefined

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
] satisfies ErrorTemplate[]
