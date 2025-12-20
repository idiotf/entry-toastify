interface VariableMetadata {
  variableType: 'stt' | 'answer' | 'list' | 'slide' | 'timer' | 'variable'
}

export class Variable {
  static create(variableMetadata: VariableMetadata): Variable

  getName(): string
}
