import {Navbar , NavDropdown , Nav, Form, FormControl, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/nav.css'
import LogoImg from '../images/logo.png'
function MyNavbar2(props) {
    var register_path = '#';
    var my_path = '#';
    if(props.user_id !== -1){
        register_path = '/registerProduct';
        my_path = '/myPage';
    }
    return(
        <div style={{backgroundColor:'#FFFFFF'}}>
            <div style={{textAlign:'center', marginTop:'20px',marginBottom:'30px'}}>
                <img src={LogoImg} style={{height:'100px'}} onClick={()=>{window.location.href="/"}}></img>
            </div>
            <hr/>
            <div style={{marginLeft:'auto',marginRight:'auto',width:'1280px'}}>
            <Navbar bg="#FFFFFF" variant="light">
                <Nav className="mx-auto">
                    <Nav.Link className="h5 mr-3 ml-5 " href="/Home" >Home</Nav.Link>
                    <Nav.Link className="h5 mr-3 ml-3 "  href="/Search">Search</Nav.Link>
                    <Nav.Link className="h5 mr-3 ml-3 " onClick={()=>{
                        if(props.user_id === -1){
                            alert('Please Login First!');
                        }
                    }} href={register_path}>Product registration</Nav.Link>
                    <Nav.Link className="h5 mr-3 ml-3 " onClick={()=>{
                        if(props.user_id === -1){
                            alert('Please Login First!');
                        }
                    }} href={my_path}>MyPage</Nav.Link>
                </Nav>
            </Navbar>
            </div>
            <hr/>
        </div>
    );
}

export default MyNavbar2;