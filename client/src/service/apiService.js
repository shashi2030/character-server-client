import axios from 'axios';
import * as constant from '../constants';

export const baseService = {
    get,
    post
};

// get call
function get(_url){
    const url = constant.baseUrl + _url;
    return axios.get(url).then(response => Promise.resolve(response)).catch(err => Promise.reject(err));
}

// post call
function post(_url,body){
    const url = constant.baseUrl + _url;
    return axios.post(url,body).then(response => Promise.resolve(response)).catch(err => Promise.reject(err));
}
