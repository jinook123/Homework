import axios from 'axios';
import React from 'react';
import { alertDialog, confirmDialog } from 'pages/common/components/DialogConfirm';

let isTokenRefreshing = false;
let refreshSubscribers = [];

const callApi = ({ url, method, data, type }, config) => {
    let api_url = url;

    const accessTokenSession = sessionStorage.getItem('accessToken');
    const refreshTokenSession = sessionStorage.getItem('refreshToken');

    let accessToken = '';
    let refreshToken = '';

    if (accessTokenSession !== null) {
        accessToken = accessTokenSession;
    }
    if (refreshToken !== null) {
        refreshToken = refreshTokenSession;
    }

    const headers = {
        // Authorization: token,
        'Content-Type': 'application/json;charser=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'X-AUTH-TOKEN': accessToken,
    };
  
    let axiosRequest = '';
    if (method === 'post') {
        // post 방식
        axiosRequest = axios.post(api_url, data, {
            headers: {
                'X-AUTH-TOKEN': accessToken,
            },
        });
    } else if (method === 'get') {
        // get 방식
        axiosRequest = axios.get(api_url, {
            params: data,
            headers: headers,
            ...config,
        });
    } else if (method === 'put') {
        // put
        axiosRequest = axios.put(api_url, data, {
            headers: {
                'Content-Type': 'application/json;charser=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'X-AUTH-TOKEN': accessToken,
            },
        });
    } else if (method === 'patch') {
        // put
        axiosRequest = axios.patch(api_url, data, {
            headers: {
                'Content-Type': 'application/json;charser=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'X-AUTH-TOKEN': accessToken,
            },
        });
    } else if (method === 'delete') {
        // delete
        axiosRequest = axios.delete(api_url, {
            headers: {
                'Content-Type': 'application/json;charser=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'X-AUTH-TOKEN': accessToken,
            },
            data: data, //delete의 경우 data라는 필드로 정의를 해줘야 된다.
        });
    } 

    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const {
                config,
                response: { status },
            } = error;

            // 에러 처리
            if (status == 500) {
                if (!isTokenRefreshing) {
                    isTokenRefreshing = true;
                    sessionStorage.clear();

                    alertDialog('서버에러.', '확인').then(() => {
                        window.location.href = '/home';
                    });
                }
            }
            
            return Promise.reject(error);
        },
    );

    return axiosRequest;
};

const callApiByMethod = ({ url, method = 'get', data, type }, config) => {
    return callApi({ url, method, data, type }, config)
        .then((response) => {
            return {
                isSuccess: true,
                data: response.data,
                resultCode: response.status,
                response,
            };
        })
        .catch((error) => {
            return {
                isSuccess: false,
                data: error.response.data != undefined ? error.response.data : error.response,
                resultCode: -999,
                response: error,
                messageCode: '',
            };
        });
};

export default callApiByMethod;
