import {Modal, Button, InputGroup, FormControl} from 'react-bootstrap';
import React, {Component} from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

class MyRegister extends Component {
  state = {
    val_id:"",
    val_pw:"",
    val_check_pw:"",
    val_name:"",
    check_id:false,
    check_pw:false,
    msg_id:"",
    msg_check:"",
    msg_pw:"",
    msg_pw_color:"red",
    msg_id_color:"red",
  }
  checkID(){
    axios.post("http://localhost:8000/checkID", {
            id: this.state.val_id})
            .then(({data}) => {
            if(data.check === true){
              this.setState({msg_id:"You can use your ID!" , msg_id_color:"blue",check_id:"true"})
            }
            else{
              this.setState({msg_id:"Someone else is using this ID. Pleae use Another ID.", msg_id_color:"red"})
            }
        }) 
  }
  registerNewUser(){
    axios.post("http://localhost:8000/register", {
            id: this.state.val_id,
            pw:this.state.val_pw,
            name:this.state.val_name})
            .then(({data}) => {
            this.props.onHide(true);
        }) 
  }
    render(){
        return(
          <div>
            <Modal
            show = {true}
            dialogClassName="modal-90w"
             aria-labelledby="example-custom-modal-styling-title"
            centered
          >
            <Modal.Header >
              <Modal.Title id="contained-modal-title-vcenter">
                Register
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Register your ID, PW, NAME</p>
            <InputGroup className="mx-auto mb-3 w-60">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-default">ID</InputGroup.Text>
              </InputGroup.Prepend>
              
              <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={this.state.val_id}
                onChange={e => this.setState({ val_id: e.target.value ,check_id:false})}
              />
              <Button variant="outline-secondary" onClick={()=>{
                if(this.state.val_id === ""){
                  alert('Please input your ID!')
                }
                else{
                  this.checkID();
                }
              }
            }>Check</Button>
            </InputGroup>
            <p style={{color:this.state.msg_id_color, textAlign:'center'}}>{this.state.msg_id}</p>
            <InputGroup className="mx-auto mb-3 w-60">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-default">PW</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                type="password"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={this.state.val_pw}
                onChange={e => this.setState({ val_pw: e.target.value })}
              />
            </InputGroup>

            <InputGroup className="mx-auto mb-3  w-60">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-default">PW Check</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                type="password"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={this.state.val_check_pw}
                onChange={e => {
                  if(e.target.value === this.state.val_pw){
                    this.setState({ val_check_pw: e.target.value , msg_pw:"PW same" , msg_pw_color:'blue', check_pw:true})
                  }
                  else if(e.target.value !== this.state.val_pw){
                    this.setState({ val_check_pw: e.target.value , msg_pw:"PW different", msg_pw_color:'red', check_pw:false})
                  }
                }}
              />
            </InputGroup>
            <p style={{color:this.state.msg_pw_color,textAlign:'center',margin:''}}>{this.state.msg_pw}</p>

            <InputGroup className="mx-auto mb-3 w-60">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-default">NAME</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={this.state.val_name}
                onChange={e => this.setState({ val_name: e.target.value })}
              />
            </InputGroup>

            <p style={{color:'red',textAlign:'center'}}>{this.state.msg_check}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button  onClick={()=>{
                if(this.state.val_id === "" || this.state.val_pw === "" || this.state.val_check_pw === "" || this.state.val_name === ""){
                  this.setState({
                    msg_check:"Please input all Data!"
                  });
                }
                else if(this.state.check_id === false){
                  this.setState({
                    msg_check:"Check your ID Please!"
                  });
                }
                else if(this.state.check_pw === false){
                  this.setState({
                    msg_check:"Check your PW Please!"
                  });
                }
                else{
                  this.registerNewUser();
                }
                }}>Register</Button>
              <Button variant="dark" onClick={()=>{this.props.onHide(false);}}>Close</Button>
            </Modal.Footer>
          </Modal>
          </div>
        );
    }
}

export default MyRegister;