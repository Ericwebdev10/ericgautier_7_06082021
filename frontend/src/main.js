import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

//variable global
Vue.prototype.$localhost = "http://localhost:3000/";

import Vuelidate from 'vuelidate';

Vue.use(Vuelidate);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');