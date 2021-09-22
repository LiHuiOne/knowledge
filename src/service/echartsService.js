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

const modifyEcharts = data=>{
    return axios({
        url:'/api/echart/modify',
        method:'post',
        data
    })
}

const deleteEcharts = data=>{
    return axios({
        url:'/api/echart/delete',
        method:'post',
        data
    })
}
export default{
    postEcharts,
    getEcharts,
    modifyEcharts,
    deleteEcharts
}