<template>
  <div class="page-home">
    	<c-home-nav></c-home-nav>
      <div class="wrapper" id="wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :auto-fill="false"  ref="loadmore">
          <div class="item-list">
            <router-link :to="{name: 'detail', params: { id:item.item_id }}" class="item" v-for="(item,i) in newsDataList" :key="i" tag="div">
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
            </router-link>
          </div>
        </mt-loadmore>
      </div>
      
  </div>
</template>
<script>
import CHomeNav from '@/components/HomeNav.vue'
import { getMoreNews, getRefreshNews } from '@/api/getData'
import { Loadmore, Lazyload, Toast } from 'mint-ui'
import { mapState, mapMutations, mapGetters, mapActions } from "vuex"
export default {
  data() {
    return {
      allLoaded:false,
      newsDataList:[],
      wrapperHeight:0
    }
  },
  components: {
    CHomeNav
  },
  computed:{
    ...mapState([
      'newsList'
    ])
  },
  mounted(){
    this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
    let type = this.$route.params.type
    if(this.newsList[type]){
      for(let item of this.newsList[type].news){
        this.newsDataList.push(item)
      }
      this.$nextTick(() => {
        this.$refs.wrapper.scrollTop = this.newsList[type].scrollTop  //新闻列表容器滚动浏览位置
      })
    }else{
      this.loadTop()
    }
  },
  methods: {
    ...mapMutations(['saveNewsList']),
    async loadTop() {
      let res = await getMoreNews(this.$route.params.type)
      let resJson = await res.json()
      for(let item of resJson.data){
        this.newsDataList.unshift(item)
      }
      Toast({
        message: `已经为您更新${resJson.return_count}条信息`,
        position: 'top',
        duration: 1000
      });
      this.$refs.loadmore.onTopLoaded()    
    },
    async loadBottom() {
      let res = await getRefreshNews(this.$route.params.type)
      let resJson = await res.json()
      for(let item of resJson.data){
        this.newsDataList.push(item)
      }   
      this.$refs.loadmore.onBottomLoaded()
    }
  },
  watch: {
    $route (to, from) {
      //已经浏览过的type 从store里取数据
      let fromType = from.params.type
      let scrollTop = this.$refs.wrapper.scrollTop
      this.saveNewsList({type:fromType,data:{news:this.newsDataList,scrollTop:scrollTop}})
      if (to.path.includes('home')) {
        let toType = to.params.type
        console.log(scrollTop)
        this.newsDataList = []          //动态路由切换生命周期不走，需先清空newsDataList
        if(this.newsList[toType]){
          for(let item of this.newsList[toType].news){
            this.newsDataList.push(item)
          }
          this.$nextTick(() => {
            this.$refs.wrapper.scrollTop = this.newsList[toType].scrollTop  //新闻列表容器滚动浏览位置
          })
        }else{
          this.loadTop()
        }
      }
    },
  },
  beforeRouteLeave (to, from, next) {
    //离开进入详情 存储数据 和 滚动条位置
    let type = from.params.type
    let scrollTop = this.$refs.wrapper.scrollTop
    this.saveNewsList({type:type,data:{news:this.newsDataList,scrollTop:scrollTop}})
    next()
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
      text-align: justify;
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
