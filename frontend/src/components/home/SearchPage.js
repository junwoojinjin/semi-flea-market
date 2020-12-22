import {Form, Button, InputGroup,Card, ListGroup,ListGroupItem} from 'react-bootstrap';
import React, {Component} from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';



class SearchPage extends Component {
    state = {
        products_fixed:[],
        products_auction:[],
        seller_name:'',
        p_name:'',
        price_limit:'',
    }
    
    callback = (fix,auction)=>{
        this.setState({products_fixed:fix,products_auction:auction})
    }
    getProducts = ()=>{
        axios.post("http://localhost:8000/products", 
        {
            option:true,
            seller_name:this.state.seller_name,
            p_name:this.state.p_name,
            price_limit:this.state.price_limit

        })
            .then(({data}) => {
            console.log(data)
            var fix=[], auction=[];
            for(var i = 0; i < data.length; i++){
                if(data[i].type === 'fixed'){
                    fix.push(data[i]);
                }
                else{
                    auction.push(data[i]);
                }
            }
            console.log(fix, auction);
            this.setState({products_fixed:fix,products_auction:auction});
            
        })
        .catch((e) =>{
            setTimeout(this.getProducts, 500);
        }) ;
    }
    componentDidMount(){
        
    }
    priceHandler = (e) =>{
        var tmp = e.target.value;
        var end = tmp.length-1;
        if(end === -1)
        {
            this.setState({price_limit:''})
        }
        if( parseInt(tmp[end]) < 10 && parseInt(tmp[end]) > -1){
            this.setState({price_limit:parseInt(tmp)})
        }
    }

    render(){
        var _product_fixed = [],_products_auction=[];
        var i = 0;
        var products_fix = this.state.products_fixed;
        var products_auction = this.state.products_auction;

        for( i = 0; i < products_fix.length; i++){
            var msg = '';
            if (products_fix[i].selling){
                msg = 'Selling now';
            }
            else{
                msg = 'Sold out';
            }
            _product_fixed.push(<Card  style={{ width: '18rem' ,margin:'20px' }}>
            <Card.Img variant="top" style={{height:'300px'}} src={"http://localhost:8000/product_img/"+products_fix[i].picture_path}/>
            <Card.Body>
            <Card.Title>{products_fix[i].name}</Card.Title>
            <ListGroup className="list-group-flush">
                <ListGroupItem>Price: {products_fix[i].price}$</ListGroupItem>
                <ListGroupItem>Place: {products_fix[i].place}</ListGroupItem>
            </ListGroup>
            <Button variant="primary" onClick={function(i){this.props.showDetail(products_fix[i].id);window.location.href = "/ProductDetail";}.bind(this,i)}>Go detail</Button>
            </Card.Body>
            <Card.Footer>
            <small className="text-muted">{msg}</small>
            </Card.Footer>
        </Card>)
        }
       
       for( i = 0; i < products_auction.length; i++){
            if (products_auction[i].selling){
                msg = 'Selling now';
            }
            else{
                msg = 'Sold out';
            }
            _products_auction.push(<Card  style={{ width: '18rem' ,margin:'20px' }}>
            <Card.Img variant="top" style={{height:'300px'}} src={"http://localhost:8000/product_img/"+products_auction[i].picture_path}/>
            <Card.Body>
            <Card.Title>{products_auction[i].name}</Card.Title>
            <ListGroup className="list-group-flush">
                <ListGroupItem>Price: {products_auction[i].price}$</ListGroupItem>
                <ListGroupItem>Place: {products_auction[i].place}</ListGroupItem>
            </ListGroup>
            <Button variant="primary" onClick={function(i){
                console.log(i)
                this.props.showDetail(products_auction[i].id);
                
                }.bind(this,i)}>Go detail</Button>
            </Card.Body>
            <Card.Footer>
            <small className="text-muted">{msg}</small>
            </Card.Footer>
        </Card>)
        }

        return (
            <div>
                
                <div style={{marginLeft:'auto',marginRight:'auto',width:'1380px',marginTop:'30px',backgroundColor:'#EBF5FB',padding:'30px'}}>
                <p style={{fontSize:'35px',color:'#000000',marginBottom:'10px'} }>Search you want</p>
                <InputGroup  >
                <InputGroup controlId="product_name">
                        <Form.Label style={{fontSize:'25px' , color:'#1F618D'}}>Seller Name</Form.Label>
                        <Form.Control className="w-25" type="text" placeholder="Input Seller Name" 
                            onChange={e => this.setState({ seller_name: e.target.value })} />
                        </InputGroup>

                        <InputGroup controlId="product_name">
                        <Form.Label style={{fontSize:'25px' , color:'#1F618D'}}>Product Name</Form.Label>
                        <Form.Control className="w-25" type="text" placeholder="Input Product Name" 
                            onChange={e => this.setState({ p_name: e.target.value })} />
                        </InputGroup>

                        <label  style={{fontSize:'25px',color:'#1F618D'}}>Limit Price</label>
                        <InputGroup className="w-50">
                        <Form.Control type="text" placeholder="Product Price" value={this.state.price_limit} onChange={this.priceHandler}/>
                        <InputGroup.Append>
                            <InputGroup.Text>$</InputGroup.Text>
                        </InputGroup.Append>
                        </InputGroup>
                        <br/>

                        <InputGroup >
                            <Button size="lg" onClick={this.getProducts}>Search</Button>
                        </InputGroup>
                </InputGroup>


                <p style={{fontSize:'35px',color:'#154360',textAlign:'center',marginBottom:'10px',marginTop:'80px'} }>Fixed price product</p>
                <div class="d-flex flex-wrap" style={{borderBottom:'1px solid #154360'}}>
                    {_product_fixed}
                </div>
                
                <p style={{fontSize:'35px',color:'#154360',textAlign:'center',marginTop:'20px',marginBottom:'10px'} }>Action product</p>
                <div class="d-flex flex-wrap">
                    {_products_auction}
                </div>
                  
                </div>
            </div>
        );
    }
}


export default SearchPage;