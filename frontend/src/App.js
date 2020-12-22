import './App.css';
import MyNavbar from './containers/MyNavbar';
import MyNavbar2 from './containers/MyNavbar2';
import ProductRegisterPage from './containers/ProductRegister';
import ProductsPage from './containers/Products';
import ProductsDetailPage from './containers/ProductDetail';
import ProductEdit from './containers/ProductEdit';
import MyPage from './containers/MyPage.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import SearchPage from './containers/SearchPage';

function App(props) {
  return (
    <div >
      <MyNavbar></MyNavbar>
      <MyNavbar2></MyNavbar2>
      <Switch>
        <Route path="/registerProduct"><ProductRegisterPage></ProductRegisterPage></Route>
        <Route path="/ProductDetail"><ProductsDetailPage></ProductsDetailPage></Route>
        <Route path="/ProductEdit"><ProductEdit></ProductEdit></Route>
        <Route path="/MyPage"><MyPage></MyPage></Route>
        <Route path="/Search"><SearchPage></SearchPage></Route>
        <Route path="/"><ProductsPage></ProductsPage></Route>
      </Switch>
    </div>
  );
}

export default App;
