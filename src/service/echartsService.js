import axios from './api'
const postEcharts = (data)=>{
    return axios({
        url:'/api/echart/save',
        method:'post',
        data
    })
}

const getEcharts = (params={})=>{
    return axios({
        url:'/api/echart/index',
        method:'get',
        params
    })
}
export default{
    postEcharts,
    getEcharts
}