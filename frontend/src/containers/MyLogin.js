/*import MyLogin from '../MyLogin';
import {connect} from 'react-redux';

function mapStateToProps(state) {
}
function mapDispatchToProps(dispatch) {
    return { 
        ChangeUser:function(id) {
            dispatch({type:'CHANGE_USER',id:id})
        }
    }
}
export default connect(null, mapDispatchToProps)(MyLogin);*/
import React , {Component} from 'react';
import MyLogin from '../components/login/MyLogin';
import store from '../store'

export default class extends Component{
    render(){
        return <MyLogin onHide = {()=>{this.props.onHide();}}
                        ChangeUser = {(id,name)=>{
                            store.dispatch({type:'CHANGE_USER',user_id:id,user_name:name});
                            this.props.onHide();
                    }
                    }
                >
        </MyLogin>
    }
}