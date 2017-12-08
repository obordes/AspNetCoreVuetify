import * as types from './mutation-types';

import { State } from './State';

export default {
    [types.TOGGLE_DRAWER](state: State) {
        state.drawerExpanded = !state.drawerExpanded;
    },

    [types.SET_DRAWER](state: State, data: boolean) {
        state.drawerExpanded = data;
    },

    //[types.SET_DATA](state: VuexState, data: any) {
    //    const { person, properties } = data.data;
    //    state.gid = person.gid;
    //    state.properties = properties;
    //},

    //[types.SET_USER](state: VuexState, data: any) {
    //    state.user = data;
    //},

    [types.LOGIN](state: State, data: any) {
        //state.token = data.accessToken;
    },

    //[types.LOGOUT](state: VuexState) {
    //    state.token = null;
    //    state.properties = [];
    //    state.gid = '';
    //    state.user = {};
    //},

    //[types.SET_ERROR](state: any, data: any) {
    //    state.error = data.message;
    //}
}
