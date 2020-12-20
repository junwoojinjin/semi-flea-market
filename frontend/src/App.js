import './App.css';
import MyNavbar from './containers/MyNavbar'
import MyNavbar2 from './components/default/MyNavbar2'
import {Navbar , NavDropdown , Nav, Form, FormControl, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App(props) {
  return (
    <div >
      <MyNavbar></MyNavbar>
      <MyNavbar2></MyNavbar2>
      <p>{props.user_id}</p>
    </div>
  );
}

export default App;
