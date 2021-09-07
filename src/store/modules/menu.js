import * as type from './modules_type.js'
const menuConfigInfo={
    state:{
        isCollapse:false
    },
    mutations:{
        [type.toogleCollapse](state,collapse){
            state.isCollapse=collapse
        }
    }
}
export default menuConfigInfo