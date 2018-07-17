import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//初始化数据
const state = {
  newsList:{},//已经浏览过的type数据 滚动条位置
}


//同步方法
const mutations = {
  saveNewsList(state, action) {
    state.newsList[action.type] = action.data
  }
}



// //异步请求
// const actions = {
//   async getUserInfoAction({ commit }) {
//     try {
//       let res = await getUserInfo()
//       if (res.data.code === 0) {
//         commit('saveUserInfo', res.data.data)
//       }
//     } catch (err) {
//       console.log(err)
//     }
//   }
// }


export default new Vuex.Store({
  state,
  mutations
})
