import Vuex, { ActionTree, ActionContext } from 'vuex';
import * as types from './mutation-types'
import { State } from './State';

export const toggleDrawer = (context: ActionContext<State, State>) => {
    context.commit(types.TOGGLE_DRAWER)
}

export const setDrawer = (context: ActionContext<State, State>, payload: boolean) => {
    context.commit(types.SET_DRAWER, payload);
}
