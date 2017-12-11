import Vue from 'vue';
import VueRouter from 'vue-router';
import RouterGuard from './RouterGuard';

import Login from '../components/Accounts/Login.vue';
import ChangePassword from '../components/Accounts/ChangePassword.vue';
import AccountList from '../components/Accounts/AccountList.vue';

import Dashboard from '../components/Dashboard.vue';
import Contacts from '../components/Contacts/Contacts.vue';
import Settings from '../components/Settings.vue';

import Test from '../components/Test.vue';

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    linkActiveClass: 'active',
    routes: [
        { path: '/Login', name: 'Login', component: Login, beforeEnter: RouterGuard.requireGuest },
        { path: '/Accounts/ChangePassword', name: 'Change password', component: ChangePassword, beforeEnter: RouterGuard.requireUser },
        { path: '/Accounts', name: 'Manage accounts', component: AccountList, beforeEnter: RouterGuard.requireUser },

        { path: '/', name: 'Dashboard', component: Dashboard, beforeEnter: RouterGuard.requireUser },

        { path: '/Contacts', name: 'Contacts', component: Contacts, beforeEnter: RouterGuard.requireUser },
        { path: '/Settings', name: 'Settings', component: Settings, beforeEnter: RouterGuard.requireUser },

        { path: '/Test', name: 'Test', component: Test }
        //{ path: '/counter', component: require('./components/counter/counter.vue.html') },
    ]
})
