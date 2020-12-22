import Products from '../components/home/Products';
import {connect} from 'react-redux';
import SearchPage from '../components/home/SearchPage';

function mapStateToProps(state) {
    return{
        user_id:state.user_id
    }
}
function mapDispatchToProps(dispatch) {
    return {
        showDetail:function(p_id) {
            dispatch({type:"CHANGE_PRODUCT",p_id:p_id})
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);