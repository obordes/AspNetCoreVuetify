import Vue from 'vue';
import Vuex, { ActionContext, GetterTree, ActionTree  } from 'vuex';

//import * as actions from './actions';
//import * as mutations from './mutations';
//import * as getters from './getters';

Vue.use(Vuex);

/** Model for login credentials. */
export interface LoginCredentials {
    Email: string;
    Password: string;
}

/** Model for token response. */
export interface LoginResponse {
    access_token: string;
    first_name: string;
    token_type: string;
    expires_in: string;
}

/** The state. */
export interface VuexState {
    /** Indicates whether the left navigation drawer is expanded. */
    DrawerExpanded: boolean;
    /** Gets or sets logged in user data. */
    UserData: LoginResponse | null;
    properties: string[];
    token: string | null;
    gid: string;
    user: object;
    error: string | null;
}

//enum DrawerState {
//    Collapsed,
//    Expanded
//}

export default new Vuex.Store<VuexState>({
    strict: true,
    state: {
        DrawerExpanded: true,
        UserData: null,
        properties: [],
        token: null,
        gid: '',
        user: {},
        error: null,
    },  
    //getters: getters as <GetterTree<VuexState, VuexState>>,
    getters: {
        isAuthenticated: (state: VuexState): boolean => {
            return state.UserData !== null;
        },
        userName: (state: VuexState): string | null => {
            return state.UserData ? state.UserData.first_name : null;
        }
    },
    mutations: {
        toggleDrawer: (state: VuexState) => {
            state.DrawerExpanded = !state.DrawerExpanded;
        },
        setDrawer: (state: VuexState, payload: boolean) => {
            state.DrawerExpanded = payload;
        },
        setUserData: (state: VuexState, response: LoginResponse) => {
            state.UserData = response;
        },
        clearUserData: (state: VuexState) => {
            state.UserData = null;
        }
    },
    //actions: actions as ActionTree<VuexState, VuexState>,
    actions: {
        toggleDrawer: (context: ActionContext<VuexState, VuexState>) => {
            context.commit('toggleDrawer');
        },
        setDrawer: (context: ActionContext<VuexState, VuexState>, payload: boolean) => {
            context.commit('setDrawer', payload);
        },
        login: (context: ActionContext<VuexState, VuexState>, credentials: LoginCredentials) => {
            console.log(`login ${credentials.Email}/${credentials.Password}`);
            let response = {
                access_token: 'qwertzuiop',
                first_name: 'Félix',
                token_type: 'bearer',
                expires_in: '123456',
            };
            setTimeout(() => context.commit('setUserData', response), 1000);
        },
        logout: (context: ActionContext<VuexState, VuexState>) => {
            console.log("logout");
            context.commit('clearUserData');
        }
    }
});

