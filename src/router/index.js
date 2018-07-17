import Vue from 'vue'
import Router from 'vue-router'
const Home = r => require.ensure([], () => r(require('@/pages/home.vue')), 'Home')
const Detail = r => require.ensure([], () => r(require('@/pages/detail.vue')), 'detail')
const List = r => require.ensure([], () => r(require('@/pages/list.vue')), 'List')
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/home/:type',
    name: 'home',
    component: Home
  },{
    path: '/detail/:id',
    name: 'detail',
    component: Detail
  },{
    path: '/list',
    name: 'list',
    component: List
  },{
    path: '*',
    redirect: '/home/__all__'
  }]
})
