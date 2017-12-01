import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../components/Dashboard.vue';
import Contacts from '../components/Contacts.vue';
import Settings from '../components/Settings.vue';

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', name: 'Dashboard', component: Dashboard },
        { path: '/Contacts', name: 'Contacts', component: Contacts },
        { path: '/Settings', name: 'Settings', component: Settings },
        //{ path: '/counter', component: require('./components/counter/counter.vue.html') },
    ]
})
