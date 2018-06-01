import axios from 'axios'
import qs from 'qs'

var baseUrl = 'https://xymind.net:3000';

axios.defaults.timeout = 20000;
axios.defaults.baseURL = baseUrl; //这是调用数据接口
var Content_Type = 'application/json;charset=utf-8';

axios.interceptors.request.use(
      config => {
        if(axios.defaults.baseURL == baseUrl){
            var token = getCookie('privarytoken'); //获取Cookie
            if(token&&token.length!=0){
                token = token.slice(6);
            }
            var projectId = JSON.parse(getStore('projectInfo'));
            if(projectId && projectId.length!=0){
                projectId = projectId.code;
            }
                config.headers = {
                'Content-Type': Content_Type,
                'Stafftoken': token,
                'Itemid': projectId  //项目iD
                };
         }
            return config;
       },
       err => {
            return Promise.reject(err);
      }
    );
axios.interceptors.response.use(
      response => {
            return response;
      },
      error => {
            return Promise.reject(error.response)
      });
/**
 * get 请求方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function get(url, params = {}, newUrl, dataType) {
    if(dataType == 'formdata'){
        params = qs.stringify(params)
    }
    if(newUrl){
        axios.defaults.baseURL = newUrl
    }else{
        axios.defaults.baseURL = baseUrl
    }
      return new Promise((resolve, reject) => {

            axios.get(url, {
                  params: params
            })
            .then(response => {
                  resolve(response);
            },err => {
                  reject(err);
            })
      })
}
/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}, newUrl, dataType) {
    if(dataType == 'formdata'){
        data = qs.stringify(data);
        Content_Type = 'application/x-www-form-urlencoded;charset=utf-8';
    }else{
        Content_Type = 'application/json;charset=utf-8';
    }
    if(newUrl){
        axios.defaults.baseURL = newUrl
    }else{
        axios.defaults.baseURL = baseUrl
    }
        return new Promise((resolve, reject) => {

        //console.log(axios.defaults.baseURL)
            axios.post(url, data)
              .then(response => {
                    resolve(response);
              }, err => {
                    reject(err);              })
      })
}
/**
 * delete 请求方法 (delete保留，不能使用)
 * @param url
 * @param params
 * @returns {Promise}
 */
export function _delete(url, data= {}, newUrl, dataType) {
    if(dataType == 'formdata'){
        data = qs.stringify(data)
    }
      return new Promise((resolve, reject) => {

            axios.delete(url, {
            data: data
            })
            .then(response => {
                  resolve(response);
            },err => {
                  reject(err);
            })
      })
}
 
/**
 * patch 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {},newUrl) {
 if(newUr){
    axios.defaults.baseURL = newUrl
}else{
        axios.defaults.baseURL = baseUrl; //这是调用数据接口
    }
      return new Promise((resolve, reject) => {
            axios.patch(url, data)
              .then(response => {
                    resolve(response);
              }, err => {
                    reject(err);
              })
      })
}
/**
 * put 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data = {}) {
      return new Promise((resolve, reject) => {
            axios.put(url, data)
              .then(response => {
                    resolve(response);
              }, err => {
                    reject(err);
              })
      })
}
