<template>
	<div class="nav-list-fixed">
		<ul class="nav-list" ref="homeNavs">
	    	<router-link 
		        v-for="(item, index) in nav" 
		        class="nav" 
		        :key="index"
		        :to="item.url + '/' +item.type" tag="li" @click.native="scrollTo">
		        {{item.text}}
	    	</router-link>
	  	</ul>
	</div>
</template>

<script>
export default {
  	data () {
	    return {
	      	nav: [
				{url: '/home', type: '__all__', text: '推荐'},
				{url: '/home', type: 'news_hot', text: '热点'},
				{url: '/home', type: 'news_society', text: '社会'},
				{url: '/home', type: 'news_entertainment', text: '娱乐'},
				{url: '/home', type: 'news_tech', text: '科技'},
				{url: '/home', type: 'news_car', text: '汽车'},
				{url: '/home', type: 'news_sports', text: '体育'},
				{url: '/home', type: 'news_finance', text: '财经'},
				{url: '/home', type: 'news_military', text: '军事'},
				{url: '/home', type: 'news_world', text: '国际'},
				{url: '/home', type: 'news_fashion', text: '时尚'}
	      	],
	    }
	},
	mounted(){
		
	},
	methods:{
		scrollTo(e){
			let dom = e.target
			let homeNavs = this.$refs.homeNavs
			let windowWidthHalf = document.documentElement.clientWidth/2
        	let scrollLeft = homeNavs.scrollLeft
        	let domWidthHalf = dom.clientWidth/2
        	let domLeft = dom.getBoundingClientRect().left
        	let distance = domLeft + scrollLeft - windowWidthHalf + domWidthHalf
        	homeNavs.scrollLeft = distance
		} 
	},
	watch: {
	    $route (to, from) {
	    	
	    }
	}
}
</script>
<style lang="scss">
	@import '../assets/style/common.scss';
	.nav-list-fixed{
		position:fixed;
		top:0;
		left:0;
		right:0;
		z-index:100;
		background:#f4f5f6;
		.nav-list{
			white-space:nowrap;
			overflow-y:auto;
		}
		.nav{
			display:inline-block;
			height: px2rem(80px);
			line-height: px2rem(80px);
			color:#333333;
			@include font-dpr(16px);
			padding:0 px2rem(20px);
		}
		.router-link-active {
		    color:#f85959;
		    font-weight: bold;
		}
	}
</style>
