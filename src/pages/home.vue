<template>
  <div class="page-home">
    	<c-home-nav></c-home-nav>
      <div class="wrapper" id="wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :auto-fill="false"  ref="loadmore">
          <div class="item-list">
            <div class="item" v-for="(item,i) in newsDataList" :key="i">
                <div class="item-abstract">{{item.abstract}}</div>
                <div class="item-img-list">
                  <div class="item-img" v-for="(img,index) in item.image_list">
                      <img  :key="index" v-lazy.wrapper="img.url">
                  </div>
                </div>
                <div class="item-info">
                  <span class="src">{{item.source}}</span>
                  <span class="cmt">评论：{{item.comment_count}}</span>
                  <span class="time">{{item.publish_time | timeFamatter}}前</span>
                </div>
            </div>
          </div>
        </mt-loadmore>
      </div>
      
  </div>
</template>
<script>
import CHomeNav from '@/components/HomeNav.vue'
import jsonp from 'jsonp'
import { Loadmore, Lazyload } from 'mint-ui'
export default {
  data() {
    return {
      loading:false,
      allLoaded:false,
      newsDataList:[],
      wrapperHeight:0
    }
  },
  components: {
    CHomeNav
  },
  mounted(){
    let type = this.$route.params.type
    this.getMoreNews(type)
    this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
  },
  methods: {
    getMoreNews(type){
      var _this = this
      jsonp(`https://m.toutiao.com/list/?tag=${type}&ac=wap&count=20&format=json_raw&as=A1053B5487C0B10&cp=5B47000B21100E1&max_behot_time=${parseInt(new Date().getTime() / 1000)}`, { timeout: 3000 }, function(err, res) {
        _this.newsDataList = res.data
      })  
    },
    loadTop() {
      let _this = this
      jsonp(`https://m.toutiao.com/list/?tag=${this.$route.params.type}&ac=wap&count=20&format=json_raw&as=A1053B5487C0B10&cp=5B47000B21100E1&min_behot_time=${parseInt(new Date().getTime() / 1000)}`, { timeout: 3000 }, function(err, res) {
        res.data.forEach((item,i) => {
          _this.newsDataList.unshift(item)
        })
        _this.$refs.loadmore.onTopLoaded()
      })  
    },
    loadBottom() {
      let _this = this
      jsonp(`https://m.toutiao.com/list/?tag=${this.$route.params.type}&ac=wap&count=20&format=json_raw&as=A1053B5487C0B10&cp=5B47000B21100E1&max_behot_time=${parseInt(new Date().getTime() / 1000)}`, { timeout: 3000 }, (err, res)=>{
        res.data.forEach((item,i) => {
          _this.newsDataList.push(item)
        })
        _this.$refs.loadmore.onBottomLoaded()
      })  
    }
  },
  watch: {
    $route (to, from) {
      if (to.path.includes('home')) {
        const type = to.params.type
        this.getMoreNews(type)
      }
    },
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
.page-home{
  padding-top:px2rem(90px);
  .wrapper{
    overflow:auto;
  }
  .item{
    border-bottom: 1px solid rgba(221, 221, 221, 0.6);
    padding:px2rem(20px) px2rem(30px);
    line-height:1.5;
    .item-abstract{
      @include clamp(3);
      @include font-dpr(15px);
      color:#333333;
      margin-bottom:px2rem(10px);
    }
    .item-img-list{
      @include clearfix;
      .item-img{
        float:left;
        width:33.33%;
        padding-left:px2rem(6px);
        box-sizing:border-box;
        height:px2rem(120px);
        background:#efefef;
        &:first-child{
          padding-left:0;
        }
        img{
          display:block;
          width:100%;
          height:100%;
        }
      }
    }
    .item-info{
      @include font-dpr(12px);
      margin-top:px2rem(10px);
      color:#999;
      span{
        display:inline-block;
        margin-right:px2rem(6px);
      }
    }
  }
}
  
</style>
