import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import App from './App'
import router from './router'
import store from './store'

Vue.use(ElementUI)

if (!process.env.IS_WEB) {
  Vue.use(require('vue-electron'))
}
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: {
    App
  },
  mounted() {
    var url = window.location.href;
    if (url.indexOf("page=") >= 0) {
      var name = url.substr(url.indexOf("page=") + 5);
      name = name.substr(0, name.indexOf("#/"));
      this.$router.push({
        name
      });
    }
  },
  router,
  store,
  template: '<App/>'
}).$mount('#app')