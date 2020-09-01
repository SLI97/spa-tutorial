//main.js
import Vue from 'vue'
import App from './app'
import router from './router'

// Vue.component("haha",{
// 	template:"<h1>hhha</h1>"
// })


const vm = new Vue({
	el: '#app',
	render: h => h(App),
	router,
	data() {
		return {
			"rootzz": 111
		}
	},
	provide() {
		return {
			rootzz: this.rootzz
		}
	}
})
