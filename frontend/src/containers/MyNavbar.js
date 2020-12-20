import MyNavbar from '../components/default/MyNavbar';
import {connect} from 'react-redux';


function mapStateToProps(state) {
    return{
        user_id:state.user_id,
        user_name:state.user_name
    }
}
function mapDispatchToProps(dispatch) {
    return { 
        logout:function() {
            dispatch({type:"CHANGE_USER",user_id:-1,user_name:''})
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyNavbar);