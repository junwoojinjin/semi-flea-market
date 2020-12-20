import {Navbar , NavDropdown , Nav, Form, FormControl, Button} from 'react-bootstrap';
import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/nav.css';
import LoginModal from '../login/MyLogin';
import RegisterModal from '../login/MyRegister';
class MyNavbar extends Component {
    state = {
        show_login:false,
        show_register:false
    };

    render(){
        var _modal = '';
        if(this.state.show_login){
            _modal = 
            <LoginModal 
                onHide = {()=>{this.setState({show_login:false})}}
                inputData = {(id,pw)=>{alert(id+pw)}}
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
                }
                inputData = {(id,pw)=>{alert(id+pw)}}>
            </RegisterModal>;
        }
        return(
            <div>
                <div style={{backgroundColor:'#F8F9FA'}}>
                    
                    <div style={{marginLeft:'auto',marginRight:'auto',width:'1280px'}}>
                    <Navbar style={{height:"42px"}} bg="light" variant="light">
                        <Navbar.Brand href="">Woojin</Navbar.Brand>
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