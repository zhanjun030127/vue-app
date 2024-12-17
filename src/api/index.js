import request from '@/utils/request'
export function register(data) {
  return request({
    url: '/register',
    method: 'post',
    data: data
  })
}
export function login(data) {
  return request({
    url: '/api/login',
    method: 'post',
    data: data
  })
}

export function orderList(params) {
  return request({
    url: '/my/order/list',
    method: 'get',
    params
  })
}