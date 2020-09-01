let Vue

class VueRouter {
	constructor(_options) {
		this.$options = _options
		this.mode = _options.mode || 'hash'
		this.routerMap = {}
		this.app = {
			current: "/about"
		}
	}

	static install(_Vue) {
		Vue = _Vue
		Vue.mixin({
			beforeCreate() {
				if (this.$options.router) {
					//把根实例上的挂载的router放在原型上方便全部实例访问router
					Vue.prototype.$router = this.$options.router
					this.$options.router.init()
					Vue.util.defineReactive(this.$options.router.app, 'current')
				}
			}
		})
	}

	init() {
		this.setRouterMap()
		this.bindEvent()
		this.registerComponents()
	}

	setRouterMap() {
		this.$options.routes.forEach(i => {
			this.routerMap[i.path] = i.component
		})
	}

	bindEvent() {
		const event = this.mode === 'history' ? 'popstate' : 'hashchange'
		window.addEventListener("load", this.callback.bind(this))
		window.addEventListener(event, this.callback.bind(this))
	}

	callback() {
		let path = "/"
		if (this.mode === 'history') {
			path = location.pathname
		} else {
			if (!window.location.hash) {
				window.location.hash = "/"
			} else {
				path = window.location.hash.slice(1)
			}
		}
		this.app.current = path || "/"
	}

	push(_path) {
		const path = _path || '/'
		if (this.mode === 'history') {
			history.pushState(path,null,path)
			this.app.current = path
		} else {
			window.location.hash = path
		}
	}

	registerComponents() {
		const _this = this
		Vue.component("router-view", {
			render(h) {
				const myComponent = _this.routerMap[_this.app.current]
				return h(myComponent)
			}
		})

		Vue.component("router-link", {
			props: {
				to: {
					type: String,
					require: true,
					default: "/"
				}
			},
			render(h) {
				const attrs = {href: _this.mode === 'history' ? '' : '#' + this.to}
				const on = _this.mode === 'history' ? {click: this.click} : {}
				return h("a", {class: {'router-link': true}, attrs, on}, [this.$slots.default])
			},
			methods: {
				click(e) {
					const path = this.to || "/"
					e.preventDefault()
					history.pushState(path, null, path)
					_this.app.current = path
				}
			}
		})
	}
}

module.exports = VueRouter
