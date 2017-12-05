import Vue from 'vue';
import VueRouter from 'vue-router';
import RouterGuard from './RouterGuard';

import Login from '../components/Users/Login.vue';
import Dashboard from '../components/Dashboard.vue';
import Contacts from '../components/Contacts/Contacts.vue';
import Settings from '../components/Settings.vue';
import Account from '../components/Users/Account.vue';

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    linkActiveClass: 'active',
    routes: [
        { path: '/Login', name: 'Login', component: Login, beforeEnter: RouterGuard.requireGuest },
        { path: '/', name: 'Dashboard', component: Dashboard, beforeEnter: RouterGuard.requireUser },
        { path: '/Contacts', name: 'Contacts', component: Contacts, beforeEnter: RouterGuard.requireUser },
        { path: '/Settings', name: 'Settings', component: Settings, beforeEnter: RouterGuard.requireUser },
        { path: '/Account', name: 'Manage account', component: Account, beforeEnter: RouterGuard.requireUser },
        //{ path: '/counter', component: require('./components/counter/counter.vue.html') },
    ]
})
