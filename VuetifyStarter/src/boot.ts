import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App.vue';
import router from './router/index';

Vue.use(Vuetify);

new Vue({
    el: '#app',
    router: router,
    //store,
    template: '<App/>',
    components: {
        App
    }
})

