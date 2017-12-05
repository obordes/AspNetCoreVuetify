import { VuexState } from './store';

export const isAuthenticated = (state: VuexState) => {
  return state.token !== null
}

