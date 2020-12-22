import {Modal, Button, InputGroup, FormControl} from 'react-bootstrap';
import React, {Component} from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

class EditUser extends Component {
  state = {
    val_user_name:this.props.name,
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
                Modify User name
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <InputGroup className="mx-auto mb-3 w-50">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-default">Name</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={this.state.val_user_name}
                onChange={e => this.setState({ val_user_name: e.target.value })}
              />
            </InputGroup>

            <p style={{color:'red', textAlign:'center'}}>{this.state.msg}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button  onClick={()=>{this.props.changeUserName(this.state.val_user_name)}}>Modify</Button>
              <Button variant="dark" onClick={()=>{this.props.onHide()}}>Close</Button>
            </Modal.Footer>
          </Modal>
          </div>
        );
    }
}

export default EditUser;