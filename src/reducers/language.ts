import { LANGUAGE_ACTIONS } from '../utils/consts'
import { type State, type Action } from '../types.d'

// 1. Create a initialState
export const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false
}

const ACTIONS_REDUCER = {
  [LANGUAGE_ACTIONS.INTERCHANGE_LANGUAGES]: (state: State) => {
    // logica del estado dentro del reducer
    // porque lo evitamos en los componentes
    if (state.fromLanguage === 'auto') return state

    const loading = state.fromText !== ''

    return {
      ...state,
      loading,
      result: '',
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage
    }
  },
  [LANGUAGE_ACTIONS.SET_FROM_LANGUAGE]: (state: State, action: Action) => {
    if (state.fromLanguage === action.payload) return state

    const loading = state.fromText !== ''
    return {
      ...state,
      fromLanguage: action.payload,
      result: '',
      loading
    }
  },
  [LANGUAGE_ACTIONS.SET_TO_LANGUAGE]: (state: State, action: Action) => {
    if (state.toLanguage === action.payload) return state

    const loading = state.fromText !== ''
    return {
      ...state,
      toLanguage: action.payload,
      result: '',
      loading
    }
  },
  [LANGUAGE_ACTIONS.SET_FROM_TEXT]: (state: State, action: Action) => {
    const loading = action.payload !== ''
    return {
      ...state,
      loading,
      fromText: action.payload,
      result: ''
    }
  },
  [LANGUAGE_ACTIONS.SET_RESULT]: (state: State, action: Action) => {
    return {
      ...state,
      loading: false,
      result: action.payload
    }
  }
}

// 2. Create a reducer
export const reducer = (state: State, action: Action) => {
  const { type } = action
  const actionReducer = ACTIONS_REDUCER[type]
  return (actionReducer(state, action) ?? state)
}
