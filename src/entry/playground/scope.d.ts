import type { STATIC } from '../util/static'
import type { EntityObject } from '../class/entity'

export class Scope {
  block: unknown
  type: string | null //legacy
  executor: unknown
  entity: EntityObject

  constructor(block: unknown, executor: unknown)

  callReturn(this: Scope): void
  getParam(this: Scope, index: number): unknown

  // 클래스 레벨에서 한 번만 생성
  static _reservedKeywords: Set<unknown>  

  filterReservedKeywords<T>(this: Scope, param: T): T | ''
  getParams(this: Scope): unknown

  _setBlockState(this: Scope, fieldBlock: unknown, valueState: unknown): void
  _setChildBlockState(this: Scope, fieldBlocks: unknown, currentBlockId: unknown): void

  getValue(this: Scope, key: string, scope?: Scope): unknown
  getValues<const T extends string[]>(this: Scope, keys: T, scope?: Scope): {
    [K in keyof T]: unknown
  }

  /**
   * 일반 getValue 값을 가져오기 전,
   * 현 Scope 상태에서의 executor.valueMap 을 세팅한다.
   * 이 로직은 Promise.all[] 과 유사하며, 모든 값이 준비될 때까지 Scope 를 멈춘다.
   * @param fieldBlocks getValue 에 의한 호출의 경우 1, getValues 의 경우 1 이상
   */
  _setExecutorValueMap(this: Scope, fieldBlocks: unknown[]): void

  getStringValue(this: Scope, key: string, scope?: Scope): string
  getNumberValue(this: Scope, key: string, scope?: Scope): number
  getBooleanValue(this: Scope, key: string, scope?: Scope): boolean | number

  getField(this: Scope, key: string, scope?: Scope): unknown
  getStringField(this: Scope, key: string, scope?: Scope): string
  getNumberField(this: Scope, key: string, scope?: Scope): number

  getStatement(this: Scope, key: string, scope?: Scope): typeof STATIC.BREAK | typeof STATIC.CONTINUE

  _getParamIndex(this: Scope, key: string, scope?: Scope): number
  _getStatementIndex(this: Scope, key: string, scope?: Scope): number

  die(this: Scope): typeof STATIC.BREAK
  run(this: Scope, entity: unknown, isValue?: boolean): unknown
}
