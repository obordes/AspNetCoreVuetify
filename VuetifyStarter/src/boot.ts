import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import App from './App.vue';

Vue.use(Vuetify);
Vue.use(VueRouter);

const routes = [
    { path: '/', component: require('./components/Hello.vue') },
    //{ path: '/counter', component: require('./components/counter/counter.vue.html') },
    //{ path: '/fetchdata', component: require('./components/fetchdata/fetchdata.vue.html') }
];

new Vue({
    el: '#app',
    router: new VueRouter({ mode: 'history', routes: routes }),
    //store,
    template: '<App/>',
    components: {
        App
    }
})

