import { State } from './State';

export const isAuthenticated = (state: State) => {
  return state.user !== null
}

