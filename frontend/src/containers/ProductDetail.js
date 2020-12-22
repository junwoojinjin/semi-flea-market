import ProductDetail from '../components/product/ProductDetail';
import {connect} from 'react-redux';

function mapStateToProps(state) {
    return{
        user_id:state.user_id,
        p_id:state.p_id
    }
}
function mapDispatchToProps(params) {
    return {}
}
export default connect(mapStateToProps, null)(ProductDetail);