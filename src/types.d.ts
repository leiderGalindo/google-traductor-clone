import { type AUTO_LANGUAGE, type SUPPORTD_LANGUAGES } from './utils/consts'

export type Language = keyof typeof SUPPORTD_LANGUAGES
export type AutoLanguage = typeof AUTO_LANGUAGE
export type FromLanguage = Language | AutoLanguage

export interface State {
  fromLanguage: FromLanguage
  toLanguage: Language
  fromText: string
  result: string
  loading: boolean
}

export type Action =
 | { type: 'SET_FROM_LANGUAGE', payload: FromLanguage }
 | { type: 'INTERCHANGE_LANGUAGES', payload: string }
 | { type: 'SET_TO_LANGUAGE', payload: Language }
 | { type: 'SET_FROM_TEXT', payload: string }
 | { type: 'SET_RESULT', payload: string }

export enum SectionType {
  From = 'from',
  To = 'to'
}
