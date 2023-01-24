import { createAction, handleActions } from 'redux-actions';

const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';
const SET_LOADING_STATUS = 'loading/SET_LOADING_STATUS';

//요청을 위한 액션 타입을 payload로 설정합니다(예: "sample/GET_POST").

export const startLoading = createAction(START_LOADING, (requestType) => requestType);

export const finishLoading = createAction(FINISH_LOADING, (requestType) => requestType);

export const setLoadingStatus = createAction(SET_LOADING_STATUS, (loadingStatus) => loadingStatus);

const initialState = { loadingStatus: false };

const loading = handleActions(
    {
        [START_LOADING]: (state, action) => ({
            ...state,
            [action.payload]: true,
            loadingStatus: true,
        }),
        [FINISH_LOADING]: (state, action) => ({
            ...state,
            [action.payload]: false,
            loadingStatus: false,
        }),
        [SET_LOADING_STATUS]: (state, action) => ({
            ...state,
            loadingStatus: action.payload,
        }),
    },
    initialState,
);

export default loading;
