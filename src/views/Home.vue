<template>
	<div class="home" @click.self="www('我也被按了')">
		<h1>This is an home page</h1>
		<span v-once>{{count}}</span>
		<input type="text" v-model="xxs">
		<div @click.self="www('我被按了')">change my color</div>
		<div v-show="flag">看我的颜色</div>
		<!--<img alt="Vue logo" src="../assets/logo.png" />-->
		<!--<HelloWorld msg="Welcome to Your Vue.js App" />-->
	</div>
</template>

<script>
	// @ is an alias to /src
	// import HelloWorld from '@/components/HelloWorld.vue'
	export default {
		name: 'Home',
		// components: {
		// 	HelloWorld
		// }
		directives:{
			colorRed:{
				inserted(el,bind,vnode,oldvnode){
					el.style.color = "red"
				}
			},
			colorBlue:{
				inserted(el,bind,vnode,oldvnode){
					el.style.color = "blue"
				}
			}
		},
		data() {
			return {
				count: 0,
				xxs:'',
				color:"red",
				flag:true
			}
		},
		methods: {
			www(e) {
				console.log(e)
				// this.flag = !this.flag
				// if(this.color === 'colorRed'){
				// 	this.color = 'colorBlue'
				// }else{
				// 	this.color = 'colorRed'
				// }
			},
		},
		created() {
			// const obj = {}
			//
			// Object.defineProperty(obj,"key1",{
			// 	configurable:true,
			// 	writable:true,
			// 	value:"value",
			// 	enumerable:true
			// })

			// console.log(Object.getOwnPropertyDescriptor(obj,"key1"))
			//
			// Object.freeze(obj)
			// console.log(Object.getOwnPropertyDescriptor(obj,"key1"))
			// obj.key1 = 123
		}
	}
</script>
