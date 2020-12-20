import {Modal, Button, InputGroup, FormControl} from 'react-bootstrap';
import React, {Component} from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

class MyLogin extends Component {
  state = {
    val_id:"",
    val_pw:"",
    msg:""
  }

  haha(id,pw) {
    axios.post("http://localhost:8000/login", {
            id: id,
            pw: pw})
            .then(({data}) => {
            console.log(data)
            if(data.check === false){
              this.setState({msg:data.type});
            }
            if(data.check === true){
              this.props.ChangeUser(data.user_id,data.user_name);
            }
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
                Login
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Input your ID and PW</p>
            <InputGroup className="mx-auto mb-3 w-50">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-default">ID</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={this.state.val_id}
                onChange={e => this.setState({ val_id: e.target.value })}
              />
            </InputGroup>

            <InputGroup className="mx-auto mb-3 w-50">
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
            <p style={{color:'red', textAlign:'center'}}>{this.state.msg}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button  onClick={()=>{this.haha(this.state.val_id,this.state.val_pw)}}>Login</Button>
              <Button variant="dark" onClick={()=>{this.props.onHide()}}>Close</Button>
            </Modal.Footer>
          </Modal>
          </div>
        );
    }
}

export default MyLogin;