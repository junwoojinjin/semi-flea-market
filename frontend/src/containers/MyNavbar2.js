import MyNavbar2 from '../components/default/MyNavbar2';
import {connect} from 'react-redux';

function mapStateToProps(state) {
    return{
        user_id:state.user_id
    }
}
function mapDispatchToProps(params) {
    return {}
}
export default connect(mapStateToProps, null)(MyNavbar2);