<template>
  	<div class="page-detail">
    	<h1 class="detail-t">{{data.title}}</h1>
    	<div class="news-info">
    		<div class="news-info-l">
    			<img :src="data.media_user ? data.media_user.avatar_url : ''">
    			<span>{{data.source}}</span>
    		</div>
    		<div class="news-info-r">
    			<span>{{ data.publish_time | timeFamatter }}前</span>
    			<span>{{data.comment_count}}评论</span>
    		</div>
    	</div>
    	<div class="content" v-html="data.content"></div>
  	</div>		
</template>

<script>
import { getDetailNews } from '@/api/getData'
export default {
  	data(){
  		return {
  			data:{}
  		}
  	},
  	mounted(){
  		this.getDetailNewsFun()
  	},
  	methods:{
  		async getDetailNewsFun(){
  			let res = await getDetailNews(this.$route.params.id)
  			let resJson = await res.json()
  			this.data = resJson.data
  		}
  	},
  	filters:{
	    timeFamatter(val){
		    let nowDate = new Date().getTime()
		    let runTime = (nowDate - (val * 1000))/1000
		    let year = Math.floor(runTime / 86400 / 365)
		    runTime = runTime % (86400 * 365)
		    let month = Math.floor(runTime / 86400 / 30)
		    runTime = runTime % (86400 * 30)
		    let day = Math.floor(runTime / 86400)
		    runTime = runTime % 86400
		    let hour = Math.floor(runTime / 3600)
		    runTime = runTime % 3600
		    let minute = Math.floor(runTime / 60)
		    runTime = runTime % 60
		    let second = runTime
		    let timeArrs = [year,month,day,hour,minute,second]
		    let timeTextArrs = ["年","月","天","小时","分钟","刚刚"]
		    let arr = [];
		    timeArrs.forEach((item,i) => {
		        if(item != 0){
		          arr.push(item + timeTextArrs[i])
		        }
		    })
		    return arr[0]
	    }
	}
}
</script>
<style lang="scss">
  	@import '../assets/style/common.scss';
  	.page-detail{
  		padding:px2rem(20px);
		.detail-t{
			@include font-dpr(22px);
		    line-height: 1.36;
		    font-weight: 500;
		}
		.news-info{
			@include flexbox;
			@include font-dpr(14px);
			@include vertical-layout(center);
			margin:px2rem(30px) 0;
			.news-info-l{
				@include flex(1);
				img{
					display:inline-block;
					border-radius:50%;
					width:px2rem(50px);
					height:px2rem(50px);
					vertical-align:middle;
					margin-top:-2px;
					margin-bottom:1px;
					margin-right:px2rem(8px);
				}
			}
			.news-info-r{
				@include font-dpr(12px);
				color:#999;
				span{
					display:inline-block;
					margin-left:px2rem(8px);
				}
			}
		}
		.content{
			@include font-dpr(16px);
			line-height:1.628;
			word-wrap: break-word;
		    color: #222;
		    text-align: justify;
			img{
				display:block;
				width:100%;
				margin:px2rem(10px);
			}
		}
  	}

</style>
