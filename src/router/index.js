import Vue from 'vue'
// import VueRouter from './myRouter'
import VueRouter from './myTestRouter'
// import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		// component: () => import('../views/About.vue')
		component: About
	}
]

const router = new VueRouter({
	mode: 'history',
	// mode: 'hash',
	// base: process.env.BASE_URL,
	routes
})

export default router
