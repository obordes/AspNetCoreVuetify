import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App.vue';
import router from './router/router';
import store from './store/store';

Vue.use(Vuetify);

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    }
})

