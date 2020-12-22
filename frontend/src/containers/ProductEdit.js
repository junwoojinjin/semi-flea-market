import ProductEdit from '../components/product/ProductEdit';
import {connect} from 'react-redux';

function mapStateToProps(state) {
    return{
        product_id:state.p_id
    }
}
function mapDispatchToProps(dispatch) {
    return {
        showDetail:function(p_id) {
            dispatch({type:"CHANGE_PRODUCT",p_id:p_id})
        }
    }
}
export default connect(mapStateToProps, null)(ProductEdit);