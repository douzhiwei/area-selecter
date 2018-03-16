import Vue from 'vue'
import App from './App'
import areaSelect from './lib/index.js'

Vue.use(areaSelect)

new Vue({
    el: '#app',
    template: '<App/>',
    components: {App}
})
