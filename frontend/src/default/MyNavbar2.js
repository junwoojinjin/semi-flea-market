import {Navbar , NavDropdown , Nav, Form, FormControl, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/nav.css'
import LogoImg from '../images/logo.png'
function MyNavbar2(params) {
    return(
        <div style={{backgroundColor:'#FFFFFF'}}>
            <div style={{textAlign:'center', marginTop:'20px',marginBottom:'30px'}}>
                <img src={LogoImg} style={{height:'100px'}}></img>
            </div>
            <hr/>
            <div style={{marginLeft:'auto',marginRight:'auto',width:'1280px'}}>
            <Navbar bg="#FFFFFF" variant="light">
                <Nav className="mx-auto">
                    <Nav.Link className="h5 mr-3 ml-5 " href="">Home</Nav.Link>
                    <Nav.Link className="h5 mr-3 ml-3 " href="">Product registration</Nav.Link>
                    <Nav.Link className="h5 mr-3 ml-3 " >Search</Nav.Link>
                    <Nav.Link className="h5 mr-3 ml-3 " >MyPage</Nav.Link>
                </Nav>
            </Navbar>
            </div>
            <hr/>
        </div>
    );
}

export default MyNavbar2;