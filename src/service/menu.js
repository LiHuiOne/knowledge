import axios from './api.js'
const getMenu = ()=> {
    return axios({
        url:'/api/menu/index',
        method:'get'
    })
}

const saveMenu = (data)=>{
    return axios({
        url:'/api/menu/save',
        method:'post',
        data
    })
}
export default{
    getMenu,
    saveMenu
}