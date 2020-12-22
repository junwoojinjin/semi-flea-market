
const initialState = {
    user_id: -1,
    user_name:'',
    p_id:-1,
  };

const reducer = (state = initialState,action)=> {
    if(action.type === 'CHANGE_USER'){
        return {...state, user_id:action.user_id , user_name:action.user_name}
    }
    if(action.type === 'CHANGE_PRODUCT'){
        return {...state, p_id:action.p_id}
    }
    else{
        return state;
    }
}
export default reducer;