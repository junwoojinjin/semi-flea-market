import {Navbar , Row , Col, Form, FormControl, Button} from 'react-bootstrap';
import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/nav.css';
import LoginModal from '../../containers/MyLogin';
import RegisterModal from '../login/MyRegister';
class MyNavbar extends Component {
    state = {
        show_login:false,
        show_register:false
    };

    render(){
        var _modal = '';
        var _top_bar = '';
        if(this.state.show_login){
            _modal = 
            <LoginModal 
                onHide = {()=>{this.setState({show_login:false})}}
            ></LoginModal>;
        }
        if(this.state.show_register){
            _modal =
            <RegisterModal 
                onHide = {(check_register)=>{
                        if(check_register){
                            this.setState({
                                show_register:false,
                                show_login:true
                            });
                        }
                        else{
                            this.setState({show_register:false})
                        }
                    }
                }>
            </RegisterModal>;
        }
        if(this.props.user_id === -1){
            _top_bar = 
                    <Navbar style={{height:"42px"}} bg="light" variant="light">
                        <Navbar.Brand href="">Woojin STORE</Navbar.Brand>
                        <Form inline className="mr-2 ml-auto">
                            <Button size="sm" variant="outline-primary" onClick={function() {
                                this.setState({
                                    show_register:true
                                });
                            }.bind(this)}>Register</Button>
                            <Button className="ml-3" size="sm" variant="outline-dark" onClick={function() {
                                this.setState({
                                    show_login:true
                                });
                            }.bind(this)}>Login</Button>
                        </Form>
                    </Navbar>
        }
        else{
            _top_bar = 
            <Navbar style={{height:"42px"}} bg="light" variant="light">
                <Navbar.Brand href="">Woojin STORE</Navbar.Brand>
                
                <Form inline className="mr-3 ml-auto">
                    <Row>
                        <Col>
                        <FormControl size="mr-0" plaintext readOnly defaultValue={'HI! '+this.props.user_name}/>
                        </Col>
                        <Col>
                        <Button size="sm mt-1" variant="outline-dark" onClick={function() {
                            this.props.logout();
                        }.bind(this)}>Logout</Button>
                        </Col>
                    </Row>
                </Form>
            </Navbar>
        }
        return(
            <div>
                <div style={{backgroundColor:'#F8F9FA'}}>
                    
                    <div style={{marginLeft:'auto',marginRight:'auto',width:'1280px'}}>
                    {_top_bar}
                    </div>
                    <hr/>
                    <div style={{marginLeft:'auto',marginRight:'auto',width:'1280px'}}>
                    <Navbar bg="light" variant="light">
                        <Navbar.Brand href="">Flea-Market</Navbar.Brand>
                        <Form inline className="ml-auto">
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="info">Search</Button>
                        </Form>
                    </Navbar>
                    </div>
                    
                </div>
                {_modal}
            </div>
        );
    }
}

export default MyNavbar;