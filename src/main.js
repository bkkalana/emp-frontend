import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'
import VueSimpleAlert from "vue-simple-alert";
import Dropdown from 'vue-simple-search-dropdown';

require('../src/dist/css/adminlte.min.css')
require('../src/plugins/fontawesome-free/css/all.min.css')
require('../src/dist/js/adminlte')
require('../src/plugins/bootstrap/js/bootstrap.bundle')


Vue.component('pagination', require('laravel-vue-pagination'));

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(Dropdown)
Vue.use(VueSimpleAlert);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
