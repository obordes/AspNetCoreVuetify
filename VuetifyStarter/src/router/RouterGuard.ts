import store from '../store/store';
import { NavigationGuard, Route } from 'vue-router';

export default {
    requireGuest(to: Route, from: Route, next: any) {
        // will stop the routing
        next(!store.getters.isAuthenticated)
    },

    requireUser(to: Route, from: Route, next: any) {
        // will login and come back
        next(store.getters.isAuthenticated ? true : {
            path: '/login',
            query: {
                redirect: to.fullPath
            }
        })
    }

}