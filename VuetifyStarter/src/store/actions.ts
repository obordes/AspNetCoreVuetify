import * as types from './mutation-types'
import { VuexState, LoginCredentials } from './store';
import Vuex, { ActionTree, ActionContext } from 'vuex';

export const toggleDrawer = (context: ActionContext<VuexState, VuexState>) => {
    context.commit(types.TOGGLE_DRAWER)
}

export const setDrawer = (context: ActionContext<VuexState, VuexState>, payload: boolean) => {
    context.commit(types.SET_DRAWER, payload);
}

export const login = (context: ActionContext<VuexState, VuexState>, credentials: LoginCredentials) => {
    let response = {
        access_token: 'qwertzuiop',
        token_type: 'bearer',
        expires_in: '123456'
    };
    setTimeout(() => context.commit('login', response), 2000);
}

/*
// Login user with email / password
export const login = ({ commit, dispatch }, payload) => {
    return feathers.authenticate({ strategy: 'local', ...payload })
        .then(res => {
            commit(types.LOGIN, res)
            return feathers.passport.verifyJWT(res.accessToken)
        })
        .then(payload => {
            return feathers.service('users').get(payload.userId)
        })
        .then(user => {
            feathers.set('user', user)
            commit(types.SET_USER, user)
            dispatch('getData')
        })
        .catch(error => {
            console.error('Error authenticating!', error)
            commit(types.SET_ERROR, error)
        })
}
*/