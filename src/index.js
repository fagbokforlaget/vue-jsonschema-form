import Vue from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css';

// global app config
Vue.config.debug = true;
Vue.config.devtools = false;
Vue.config.productionTip = false;
Vue.config.lang = 'en';

// global event bus
const EventBus = new Vue();

Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus;
    }
  }
});

new Vue({
  el: '#app',
  render: h => h(App)
})
