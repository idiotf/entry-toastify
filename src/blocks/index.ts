import type { Scope } from '../types'

import start from './block_start'
import flow from './block_flow'
import moving from './block_moving'
import looks from './block_looks'
import text from './block_text'
import judgement from './block_judgement'
import calc from './block_calc'
import variable from './block_variable'
import func from './block_func'
import analysis from './block_analysis'

export interface ErrorTemplate {
  (error: Error, scope: Scope): string | undefined
}

export const templates: ErrorTemplate[] = [
  ...start,
  ...flow,
  ...moving,
  ...looks,
  ...text,
  ...judgement,
  ...calc,
  ...variable,
  ...func,
  ...analysis,

  // entity가 undefined일 때
  (_error, scope) => {
    if (scope.entity) return
    return Lang.Blocks.entityIsUndefined
  },
]
