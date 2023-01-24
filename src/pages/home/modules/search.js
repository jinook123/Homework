import { createAction, handleActions } from 'redux-actions';
import { call, select, takeEvery, takeLatest } from 'redux-saga/effects';
import produce from 'immer';

import createRequestSaga from 'common/lib/createRequestSaga';
import * as api from 'pages/home/api/api';

const SET_INIT = 'home/SET_INIT';
const SET_AFTER_CALL = 'home/SET_AFTER_CALL';
const SET_EMAIL_CHECK_CALL = 'home/SET_EMAIL_CHECK_CALL';

const GET_LOGIN_USER_LIST = 'home/GET_LOGIN_USER_LIST';
const GET_LOGIN_USER_LIST_SUCCESS = 'home/GET_LOGIN_USER_LIST_SUCCESS';

const GET_CAMPAIGN_LIST = 'home/GET_LOGIN_USER_LIST_SUCCESS';
const GET_CAMPAIGN_LIST_SUCCESS = 'home/GET_LOGIN_USER_LIST_SUCCESS';

const GET_USER_LIST = 'home/GET_USER_LIST';
const GET_USER_LIST_SUCCESS = 'home/GET_USER_LIST_SUCCESS';

const GET_USER_DETAIL = 'home/GET_USER_DETAIL';
const GET_USER_DETAIL_SUCCESS = 'home/GET_USER_DETAIL_SUCCESS';

const PUT_CAMPAIGN_STATUS = 'home/PUT_CAMPAIGN_STATUS';
const PUT_CAMPAIGN_STATUS_SUCCESS = 'home/PUT_CAMPAIGN_STATUS_SUCCESS';

const POST_USER_CREATE = 'home/POST_USER_CREATE';
const POST_USER_CREATE_SUCCESS = 'home/POST_USER_CREATE_SUCCESS';

const PUT_USER_MODIFY = 'home/PUT_USER_MODIFY';
const PUT_USER_MODIFY_SUCCESS = 'home/PUT_USER_MODIFY_SUCCESS';

const GET_EMAIL_CHECK = 'home/GET_EMAIL_CHECK';
const GET_EMAIL_CHECK_SUCCESS = 'home/GET_EMAIL_CHECK_SUCCESS';

const initialState = {
    payload: '',
    loginUserList: [],
    campaignList: [],
    userList: [],
    email: '',
    id: '',

    afterCallApi: '',
    emailCheckCallApi: '',
    detailData: '',
}

// SET
export const setInitSearch = createAction(SET_INIT);
export const setAfterCallApi = createAction(SET_AFTER_CALL);
export const setEmailCheckCallAPi = createAction(SET_EMAIL_CHECK_CALL);

// GET
export const getList = createAction(GET_LOGIN_USER_LIST);
export const getCampignList = createAction(GET_CAMPAIGN_LIST, ({page, size}) => ({page, size}));
export const getUserList = createAction(GET_USER_LIST, ({page, size}) => ({page, size}));
export const putCampaignStatus = createAction(PUT_CAMPAIGN_STATUS, ({id, enabled}) => ({id, enabled}));
export const postUserCreate = createAction(POST_USER_CREATE, ({name, email, password, repeat_password}) => ({name, email, password, repeat_password}));
export const putUserModify = createAction(PUT_USER_MODIFY, ({id, name}) => ({id, name}));
export const getEmailCheck = createAction(GET_EMAIL_CHECK, ({email}) => ({email}));
export const getUserDetail = createAction(GET_USER_DETAIL, ({id}) => ({id}));

const getListSaga = createRequestSaga(GET_LOGIN_USER_LIST, api.getListApi, 'get', true);
const getCampaignListSaga = createRequestSaga(GET_CAMPAIGN_LIST, api.getCampignListApi, 'get', true);
const getUserListSaga = createRequestSaga(GET_USER_LIST, api.getUserListApi, 'get', true);
const postUserCreateSaga = createRequestSaga(POST_USER_CREATE, api.postUserApi, 'post', true);


function* getParamSaga(action) {
    if(action.type === PUT_CAMPAIGN_STATUS) {
        const id = yield select((state) => state.homeReducer.listReducer.id);
        const tmpUrl = api.putCampignStatusApi + id;
        console.log(tmpUrl);
        const callApi = createRequestSaga(PUT_CAMPAIGN_STATUS, tmpUrl, 'patch', true);
        yield call(callApi, '');
    } else if(action.type === PUT_USER_MODIFY){
        const id = yield select((state) => state.homeReducer.listReducer.id);
        const tmpUrl = api.putUserModifyApi + id;
        console.log(tmpUrl);
        const callApi = createRequestSaga(PUT_USER_MODIFY, tmpUrl, 'patch', true);
        yield call(callApi, '');
    } else if(action.type === GET_EMAIL_CHECK){
        const email = yield select((state) => state.homeReducer.listReducer.email);
        const tmpUrl = api.getEmailCheckApi.replace('${email}', email);
        console.log(tmpUrl);
        const callApi = createRequestSaga(PUT_USER_MODIFY, tmpUrl, 'get', true);
        yield call(callApi, '');
    } else if(action.type === GET_USER_DETAIL){
        const id = yield select((state) => state.homeReducer.listReducer.id);
        const tmpUrl = api.getUserDetailApi + id;
        console.log(tmpUrl);
        const callApi = createRequestSaga(GET_USER_DETAIL, tmpUrl, 'get', true);
        yield call(callApi, '');
    }
}

export function* listSaga() {
    //takeEvery는 들어오는 모든 액션에 대해 작업처리
    //takeLatest 기존에 진행 중이던 작업이 있다면 취소 처리하고 가장 마지막으로 실행된 작업만 수행
    yield takeLatest(GET_LOGIN_USER_LIST, getListSaga);
    yield takeLatest(GET_CAMPAIGN_LIST, getCampaignListSaga);
    yield takeLatest(PUT_CAMPAIGN_STATUS, getParamSaga);
    yield takeLatest(GET_USER_LIST, getUserListSaga);
    yield takeLatest(POST_USER_CREATE, postUserCreateSaga);
    yield takeLatest(PUT_USER_MODIFY, getParamSaga);
    yield takeLatest(GET_EMAIL_CHECK, getParamSaga);
    yield takeLatest(GET_USER_DETAIL, getParamSaga);
    
}


export const listReducer = handleActions(
    {
        [SET_INIT]: (state, action) => ({
            ...state,
            payload: '',
            loginUserList: [],
            campaignList: [],
            userList: [],
            email: '',
            id: '',
        
            afterCallApi: '',
            emailCheckCallApi: '',
            detailData: '',
        }),
        [SET_AFTER_CALL]: (state, action) => ({
            ...state,
            afterCallApi: '',
        }),
        [SET_EMAIL_CHECK_CALL]: (state, action) => ({
            ...state,
            emailCheckCallApi: '',
        }),
        [GET_LOGIN_USER_LIST]: (state, action) => ({
            ...state,
            payload: action.payload,
        }),
        [GET_LOGIN_USER_LIST_SUCCESS]: (state, action) => ({
            ...state,
            list: action.payload
        }),

        [GET_CAMPAIGN_LIST]: (state, action) => ({
            ...state,
            payload: action.payload,
        }),
        [GET_CAMPAIGN_LIST_SUCCESS]: (state, action) => ({
            ...state,
            campaignList: action.payload
        }),

        [PUT_CAMPAIGN_STATUS]: (state, action) => ({
            ...state,
            id: action.payload.id
        }),
        [PUT_CAMPAIGN_STATUS_SUCCESS]: (state, action) => ({
            ...state,
            afterCallApi: action.payload !== undefined ? action.payload : '',
        }),
        [GET_USER_LIST]: (state, action) => ({
            ...state,
            payload: action.payload,
        }),
        [GET_USER_LIST_SUCCESS]: (state, action) => ({
            ...state,
            userList: action.payload
        }),
        [POST_USER_CREATE]: (state, action) => ({
            ...state,
            payload: action.payload
        }),
        [POST_USER_CREATE_SUCCESS]: (state, action) => ({
            ...state,
            afterCallApi: action.payload !== undefined ? action.payload : '',
        }),
        [PUT_USER_MODIFY]: (state, action) => ({
            ...state,
            payload: action.payload.id
        }),
        [PUT_USER_MODIFY_SUCCESS]: (state, action) => ({
            ...state,
            afterCallApi: action.payload !== undefined ? action.payload : '',
        }),
        [PUT_USER_MODIFY]: (state, action) => ({
            ...state,
            payload: action.payload.id
        }),
        [PUT_USER_MODIFY_SUCCESS]: (state, action) => ({
            ...state,
            afterCallApi: action.payload !== undefined ? action.payload : '',
        }),
        [GET_EMAIL_CHECK]: (state, action) => ({
            ...state,
            payload: action.payload.id
        }),
        [GET_EMAIL_CHECK_SUCCESS]: (state, action) => ({
            ...state,
            emailCheckCallApi: action.payload !== undefined ? action.payload : '',
        }),
        [GET_USER_DETAIL]: (state, action) => ({
            ...state,
            id: action.payload.id
        }),
        [GET_USER_DETAIL_SUCCESS]: (state, action) => ({
            ...state,
            detailData: action.payload !== undefined ? action.payload : '',
        }),
        
    },
    initialState,
);
