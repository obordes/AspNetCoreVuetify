import Vue from 'vue';
import Vuex, { ActionContext, GetterTree, ActionTree  } from 'vuex';
import { State } from './State';
import { HTTP } from '../helpers/http';
import * as jwtDecode from 'jwt-decode';
import * as JwtConstants from '../JwtConstants';

//import * as actions from './actions';
//import * as mutations from './mutations';
//import * as getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store<State>({
    strict: true,
    state: {
        drawerExpanded: true,
        user: null,
        title: ''
    },  
    //getters: getters as <GetterTree<VuexState, VuexState>>,
    getters: {
        isAuthenticated: (state: State): boolean => {
            return state.user !== null;
        },
        isAdmin: (state: State): boolean => {
            return state.user !== null && state.user.isAdmin;
        },
        userName: (state: State): string | null => {
            return state.user ? state.user.firstName ? state.user.firstName : state.user.lastName :null;
        }
    },
    mutations: {
        toggleDrawer: (state: State) => {
            state.drawerExpanded = !state.drawerExpanded;
        },
        setDrawer: (state: State, payload: boolean) => {
            state.drawerExpanded = payload;
        },
        setTitle: (state: State, title: string) => {
            state.title = title;
        },
        setUser: (state: State, token?: string) => {
            if (token) {
                let decoded = jwtDecode(token);
                state.user = {
                    id:         decoded[JwtConstants.ClaimNameIdentifier],
                    userName:   decoded[JwtConstants.ClaimSub],
                    email:      decoded[JwtConstants.ClaimEmail],
                    lastName:   decoded[JwtConstants.ClaimSurname],
                    firstName:  decoded[JwtConstants.ClaimGivenName],
                    token:      token,
                    isElfStaff: typeof decoded[JwtConstants.ClaimElfStaff] !== 'undefined',
                    isAdmin:    typeof decoded[JwtConstants.ClaimAdmin] !== 'undefined'
                };
            } else {
                state.user = null;
            }
        },
    },
    //actions: actions as ActionTree<VuexState, VuexState>,
    actions: {
        toggleDrawer: (context: ActionContext<State, State>) => {
            context.commit('toggleDrawer');
        },
        setDrawer: (context: ActionContext<State, State>, payload: boolean) => {
            context.commit('setDrawer', payload);
        },
        setTitle: (context: ActionContext<State, State>, title: string) => {
            context.commit('setTitle', title);
        },
        setUser: (context: ActionContext<State, State>, token?: string) => {
            context.commit('setUser', token);
        },
    }
});

