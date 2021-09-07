import { createStore } from 'vuex'
import test from './modules/test.js'
import menuConfigInfo from './modules/menu.js'
export default createStore({
  modules:{
    test,
    menuConfigInfo
  },
  getters:{
    
  }
})
