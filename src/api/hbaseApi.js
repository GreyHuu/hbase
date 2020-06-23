import { api } from './index'
import { axios } from '@/utils/request'

/**
 * 获得全部的部门
 * @param parameter
 * @returns {*}
 */
export function getAllDept() {
  return axios({
    url: 'http://localhost:8080/get-all-dept',
    method: 'GET'
  })
}

/**
 * 查询部门
 * @param parameter
 * @returns {AxiosPromise}
 */
export function getDeptByRowKey(parameter) {
  return axios({
    url: 'http://localhost:8080/get-dept-by-id',
    method: 'POST',
    data: parameter
  })
}

/**
 * 查询子部门
 * @param parameter
 * @returns {AxiosPromise}
 */
export function getSubDeptByRowKey(parameter) {
  return axios({
    url: 'http://localhost:8080/get-sub-dept-by-id',
    method: 'POST',
    data: parameter
  })
}