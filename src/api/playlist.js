// 歌单管理 数据的操作
import request from '@/utils/request' // request.js为是基于axios封装好的请求方法
const baseURL = 'http://localhost:3000' // 后端请求接口

// 获取歌单列表数据
export function fetchList(params) {
  return request({
    params,
    url: `${baseURL}/playlist/list`,
    method: 'get'
  })
}

// 单条歌单
export function fetchById(params) {
  return request({
    params,
    url: `${baseURL}/playlist/getById`,
    method: 'get'
  })
}