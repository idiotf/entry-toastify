import type { ErrorTemplate } from '.'

export default [
  // 일반 오브젝트 또는 '대상 없음'의 글상자 내용 읽기
  (_error, scope) => {
    if (scope.type != 'text_read') return

    if (!scope.entity) return Lang.Blocks.entityIsUndefined
    return Lang.Blocks.canNotReadText(scope.entity.parent.name)
  },
] satisfies ErrorTemplate[]
