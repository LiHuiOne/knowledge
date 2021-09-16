import axios from "./api"; //导入使用axios方法
const getIndex = ()=>{
    return axios({
        url: "/api/home/find",
        method:'get'
    })
}
export default{
    getIndex
}