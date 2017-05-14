//remember to add new reducers to your root reducer!
import * as types from '../actions/actionTypes';
import initialState from './initialState';

function actionTypeEndsInSuccess(type) {
	return type.substring(type.length - 8) == '_SUCCESS';
}

export default function ajaxStatusReducer(state= initialState.ajaxCallsInProgress, action) {
	//we use if instead of switch 
	if(action.type == types.BEGIN_AJAX_CALL) {
            return state + 1;
    } else if (action.type == types.AJAX_CALL_ERROR || actionTypeEndsInSuccess(action.type)) { 
        //handling error too
        return state - 1;
    }
	//so when it successful that mean that the ajax request successfully 
	return state;
}
