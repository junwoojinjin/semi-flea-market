import {createStore} from 'redux';

export default createStore(function(state,action) {
    if(state === undefined){
        return {user_id:-1, user_name:''}
    }
    if(action.type === 'CHANGE_USER'){
        return {...state, user_id:action.user_id , user_name:action.user_name}
    }
    
})