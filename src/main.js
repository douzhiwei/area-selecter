// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Area from './lib/index.js'

Vue.use(Area)

new Vue({
    el: '#app',
    template: '<App/>',
    components: {App}
})
