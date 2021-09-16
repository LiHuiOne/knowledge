import axios from "./api"; //导入使用axios方法

//axios，post传参使用data,get使用params
const login = (data)=>{
    return axios({
        url: "/api/user/login",
        method:'post',
        data
    })
}
export default{
    login
}