import * as type from './modules_type.js'
const test={
    state:{
        testInfo:''
    },
    mutations:{
        [type.testSetInfo](state,info){
            console.log(info,'3')
            state.testInfo=info
        }
    },
    actions:{

    }
}
export default test