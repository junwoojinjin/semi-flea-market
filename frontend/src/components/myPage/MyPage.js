import {Form, Button, Table} from 'react-bootstrap';
import React, {Component} from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import EditUser from './EditUser';


export default class MyPage extends Component {
    
    state = {
        my_products:[],
        my_buy_products:[],
        my_wish_list:[],
        spent_money:0,
        earn_money:0,
        users:[],
        e_user_id:-1,
        show_modal:false
    }

    componentDidMount(){
        
        axios.post("http://localhost:8000/getMyProductByID", 
        {
            user_id:this.props.user_id
        })
        .then(({data}) => {
            console.log(data)
            var products = data,sum = 0;
            for(var i = 0 ; i < products.length;i++){
                if(products[i].selling === 0){
                    sum += products[i].price;
                }
            }
            this.setState({my_products:data,earn_money:sum});
        })

        axios.post("http://localhost:8000/getMyPurchaseListByID", 
        {
            user_id:this.props.user_id
        })
        .then(({data}) => {
            console.log(data)
            var products = data,sum = 0;
            for(var i = 0 ; i < products.length;i++){
                if(products[i].selling === 0){
                    sum += products[i].price;
                }
            }
            this.setState({my_buy_products:data,spent_money:sum});
        })

        axios.post("http://localhost:8000/getWishListByID", 
        {
            user_id:this.props.user_id
        })
        .then(({data}) => {
            console.log(data)
            this.setState({my_wish_list:data});
        })

        if(this.props.user_id === 0){
            axios.post("http://localhost:8000/getUsers", 
            {
                
            })
            .then(({data}) => {
                console.log(data)
                this.setState({users:data});
            })
        }
    }

    deleteHandler(product_id){
        axios.post("http://localhost:8000/deleteMyProductByID", 
        {
            product_id:product_id
        })
        .then(({data}) => {
            console.log(data)
            window.location.href="/myPage"
        })
    }
    deleteMember(user_id){
        
        axios.post("http://localhost:8000/deleteUserByID", 
        {
            user_id:user_id
        })
        .then(({data}) => {
            console.log(data)
            window.location.href="/myPage"
        })
    }

    changeUserName(name){
        axios.post("http://localhost:8000/ChangeUserByID", 
        {
            user_id:this.state.users[this.state.e_user_id].id,
            name:name
        })
        .then(({data}) => {
            console.log(data)
            window.location.href="/myPage"
        })
    }
    render(){
        if(this.props.user_id === -1){
            window.location.href = '/Home';
        }
        var _rows_my_sell = [];
        var _rows_my_purchase = [];
        var _rows_wish = [];
        var products = this.state.my_products;
        for(var i = 0 ; i < products.length;i++){
            var msg='On sale';
            var _buttons = <td style={{width:'230px'}}>
                                <Button variant="secondary" onClick={function(id) {
                                    this.props.showDetail(id);
                                    window.location.href="/ProductDetail"
                                }.bind(this,products[i].id)}>Look</Button>{' '}
                                <Button variant="info" onClick={function(id) {
                                    this.props.showDetail(id);
                                    window.location.href="/ProductEdit"
                                }.bind(this,products[i].id)}>Edit</Button>{' '}
                                <Button variant="outline-danger" onClick={function(id) {
                                    this.deleteHandler(id)
                                    //
                                }.bind(this,products[i].id)}>Delete</Button>
                            </td>;

            if(products[i].selling === 0){
                msg = 'Sold out';
                _buttons = <td style={{width:'230px'}}>
                                <Button variant="secondary" onClick={function(id) {
                                    this.props.showDetail(id);
                                    window.location.href="/ProductDetail"
                                }.bind(this,products[i].id)}>Look</Button>{' '}
                            </td>
            }
            _rows_my_sell.push(
                        <tr key={i}>
                            <td>{i}</td>
                            <td><img style={{height:'100px'}} src={"http://localhost:8000/product_img/"+products[i].picture_path}></img></td>
                            <td>{products[i].name}</td>
                            <td>{products[i].type}</td>
                            <td>{msg}</td>
                            <td>{products[i].price}</td>
                            <td>{products[i].place}</td>
                            <td>{products[i].wish_count}</td>
                            {_buttons}
                        </tr>
            )
        }

        products = this.state.my_buy_products;
        for(var i = 0 ; i < products.length;i++){
            var msg='On sale';
            if(products[i].selling === 0){
                msg = 'Sold out'
            }
            _rows_my_purchase.push(
                        <tr key={i}>
                            <td>{i}</td>
                            <td><img style={{height:'100px'}} src={"http://localhost:8000/product_img/"+products[i].picture_path}></img></td>
                            <td>{products[i].name}</td>
                            <td>{products[i].type}</td>
                            <td>{msg}</td>
                            <td>{products[i].price}</td>
                            <td>{products[i].place}</td>
                        
                            <td style={{width:'100px'}}>
                                <Button variant="secondary" onClick={function(id) {
                                    this.props.showDetail(id);
                                    window.location.href="/ProductDetail"
                                }.bind(this,products[i].id)}>Look</Button>{' '}
                            </td>
                        </tr>
            )
        }
        
        products = this.state.my_wish_list;
        for(var i = 0 ; i < products.length;i++){
            var msg='On sale';
            if(products[i].selling === 0){
                msg = 'Sold out'
            }
            _rows_wish.push(
                        <tr key={i}>
                            <td>{i}</td>
                            <td><img style={{height:'100px'}} src={"http://localhost:8000/product_img/"+products[i].picture_path}></img></td>
                            <td>{products[i].name}</td>
                            <td>{products[i].type}</td>
                            <td>{msg}</td>
                            <td>{products[i].price}</td>
                            <td>{products[i].place}</td>
                        
                            <td style={{width:'100px'}}>
                                <Button variant="secondary" onClick={function(id) {
                                    this.props.showDetail(id);
                                    window.location.href="/ProductDetail"
                                }.bind(this,products[i].id)}>Look</Button>{' '}
                            </td>
                        </tr>
            )
        }
        var _users = [];
        var _users_list = '';

        if(this.props.user_id === 0)
        {
            var users = this.state.users;
            for(var i = 0 ; i < users.length; i++){
                _users.push(
                    <tr key={i}>
                        <td>{i}</td>
                        <td>{users[i].name}</td>
                        <td>{users[i].login_id}</td>
                    
                        <td style={{width:'200px'}}>
                            <Button variant="outline-info" onClick={function(i) {
                                this.setState({show_modal:true,e_user_id:i})
                            }.bind(this,i)}>Modify</Button>{' '}
                            <Button variant="outline-danger" onClick={function(id) {
                                this.deleteMember(id)
                            }.bind(this,users[i].id)}>Delete</Button>{' '}
                        </td>
                    </tr>
                );
            }
            _users_list = <div> 
                                <p style={{fontSize:'30px',color:'#154360',marginBottom:'20px',borderBottom:'1px solid '} }>Member List</p>
                                <Table  bordered hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>ID</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {_users}
                                    </tbody>
                                </Table>
                          </div>;
            var modal = '';
            if (this.state.show_modal){
                modal = <EditUser name={users[this.state.e_user_id].name} changeUserName={(name)=>{this.changeUserName(name);this.setState({show_modal:false})}} onHide={()=>{this.setState({show_modal:false})}}></EditUser>;
            }
            return (
                <div>
                    {modal}
                <div style={{marginLeft:'auto',marginRight:'auto',width:'1380px',marginTop:'30px',backgroundColor:'#EBF5FB',padding:'30px'}}>
                <p style={{fontSize:'40px',color:'#154360',textAlign:'center',marginBottom:'50px'} }>ADMINISTRATOR PAGE</p>
                    {_users_list}
                </div>
                </div>
            )
        }
        return(
            <div>
                <div style={{marginLeft:'auto',marginRight:'auto',width:'1380px',marginTop:'30px',backgroundColor:'#EBF5FB',padding:'30px'}}>
                <p style={{fontSize:'40px',color:'#154360',textAlign:'center',marginBottom:'50px'} }>MyPage</p>

                <p style={{fontSize:'30px',color:'#154360',marginBottom:'20px',borderBottom:'1px solid '} }>My Sale Products List<div style={{fontSize:'20px',color:'#154360',display:'inline',marginLeft:'20px'} }>Earned_money:{this.state.earn_money}$</div></p>
                <Table  bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Picture</th>
                        <th>Product Name</th>
                        <th>Type</th>
                        <th>State</th>
                        <th>Price</th>
                        <th>Place</th>
                        <th>Wish</th>
                        </tr>
                    </thead>
                    <tbody>
                        {_rows_my_sell}
                    </tbody>
                </Table>

                <p style={{fontSize:'30px',color:'#154360',marginTop:'80px',marginBottom:'20px',borderBottom:'1px solid '} }>My Purchase List<div style={{fontSize:'20px',color:'#154360',display:'inline',marginLeft:'20px'} }>Spent_money:{this.state.spent_money}$</div></p>
                <Table  bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Picture</th>
                        <th>Product Name</th>
                        <th>Type</th>
                        <th>State</th>
                        <th>Price</th>
                        <th>Place</th>
                        
                        </tr>
                    </thead>
                    <tbody>
                        {_rows_my_purchase}
                    </tbody>
                </Table>
                

                <p style={{fontSize:'30px',color:'#154360',marginTop:'80px',marginBottom:'20px',borderBottom:'1px solid '} }>My Wish List</p>
                <Table  bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Picture</th>
                        <th>Product Name</th>
                        <th>Type</th>
                        <th>State</th>
                        <th>Price</th>
                        <th>Place</th>
                        <th>Wish</th>
                        </tr>
                    </thead>
                    <tbody>
                        {_rows_wish}
                    </tbody>
                </Table>
                </div>

                
            </div>
        )
    }
}