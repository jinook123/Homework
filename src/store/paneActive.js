// redux
import { createAction, handleActions } from 'redux-actions';

//////////////////////////////////////// 
// States & Variables 
////////////////////////////////////////
const initialState = {
    isPaneActive: true,
};

//////////////////////////////////////// 
// Action Types 
////////////////////////////////////////
const IS_PANE_ACTIVE = 'paneActive/IS_PANE_ACTIVE';

//////////////////////////////////////// 
// Action Creators 
////////////////////////////////////////
export const screenPaneActive = createAction(IS_PANE_ACTIVE);

//////////////////////////////////////// 
// Reducer 
////////////////////////////////////////
const paneActive = handleActions( 
    { 
        [IS_PANE_ACTIVE]: (state, action) => ({
            ...state,
            isPaneActive: action.payload,
          }),
    }
    , initialState 
);

export default paneActive;



