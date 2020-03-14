import Vue from 'vue'
import App from './App.vue'
import areaSelect from '../dist/area-selecter'
Vue.use(areaSelect)


new Vue({
  render: (h) => h(App)
}).$mount('#app')
