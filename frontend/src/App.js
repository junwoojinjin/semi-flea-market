import './App.css';
import MyNavbar from './default/MyNavbar'
import MyNavbar2 from './default/MyNavbar2'
import {Navbar , NavDropdown , Nav, Form, FormControl, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div >
      <MyNavbar></MyNavbar>
      <MyNavbar2></MyNavbar2>
    </div>
  );
}

export default App;
