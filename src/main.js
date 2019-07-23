import Vue from 'vue'
import App from './App'
import areaSelect from '../dist/area-selecter'

Vue.use(areaSelect)

new Vue({
    el: '#app',
    template: '<App/>',
    components: {App}
})
