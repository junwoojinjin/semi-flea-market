import {Modal, Button, InputGroup, FormControl} from 'react-bootstrap';
import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class MyLogin extends Component {
  state = {
    val_id:"",
    val_pw:"",
    msg:""
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
            <p>{this.state.msg}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button  onClick={()=>{this.props.inputData(this.state.val_id,this.state.val_pw)}}>Login</Button>
              <Button variant="dark" onClick={()=>{this.props.onHide()}}>Close</Button>
            </Modal.Footer>
          </Modal>
          </div>
        );
    }
}

export default MyLogin;