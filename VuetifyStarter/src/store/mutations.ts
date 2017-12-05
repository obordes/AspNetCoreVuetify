import * as types from './mutation-types';

import { VuexState } from './store';

export default {
    [types.TOGGLE_DRAWER](state: VuexState) {
        state.DrawerExpanded = !state.DrawerExpanded;
    },

    [types.SET_DRAWER](state: VuexState, data: boolean) {
        state.DrawerExpanded = data;
    },

    //[types.SET_DATA](state: VuexState, data: any) {
    //    const { person, properties } = data.data;
    //    state.gid = person.gid;
    //    state.properties = properties;
    //},

    //[types.SET_USER](state: VuexState, data: any) {
    //    state.user = data;
    //},

    [types.LOGIN](state: VuexState, data: any) {
        state.token = data.accessToken;
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
