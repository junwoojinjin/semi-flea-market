import {Form, Button, InputGroup,Image,Row,Col} from 'react-bootstrap';
import React, {Component} from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';


class ProductRegister extends Component {
    state = {
        type:'fixed',
        name:'',
        price:0,
        place:'',
        phone_num:'',
        date:1,
        file:'',
        imgBase64:'',
    }

    imgHandler = (e) =>{
        let reader = new FileReader();
        reader.onloadend = () => {
            // 2. 읽기가 완료되면 아래코드가 실행됩니다.
            const base64 = reader.result;
            if (base64) {
                this.setState({ 
                    file: e.target.files[0],
                    imgBase64: base64
                });
            }
          }
          if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
          }
    }

    typeHandler = (e) =>{
        if(e.target.value === 'Auction'){
            this.setState({type:'auction'});
        }
        else{
            this.setState({type:'fixed'});
        }
    }
    dateHandler = (e) => {
        this.setState({date:parseInt(e.target.value)});
    }
    priceHandler = (e) =>{
        var tmp = e.target.value;
        var end = tmp.length-1;
        if(end === -1)
        {
            this.setState({price:0})
        }
        if( parseInt(tmp[end]) < 10 && parseInt(tmp[end]) > -1){
            this.setState({price:parseInt(tmp)})
        }
    }

    phoneNumHandler = (e) =>{
        var tmp = e.target.value;
        var end = tmp.length-1;
        if(end === -1)
        {
            this.setState({phone_num:''})
        }
        if(end+1 !== 14)
        {
            if(tmp.length === 3 && this.state.phone_num.length === 2 || tmp.length === 8&& this.state.phone_num.length === 7){
                e.target.value+='-';
                this.setState({phone_num:e.target.value})
            }
            else if(parseInt(tmp[end]) < 10 && parseInt(tmp[end]) > -1 && (tmp.length === 3 && this.state.phone_num.length === 4 || tmp.length === 8&& this.state.phone_num.length === 9)){
                this.setState({phone_num:e.target.value.slice(0,end)})
            }
            else if( (parseInt(tmp[end]) < 10 && parseInt(tmp[end]) > -1) || (tmp[end] == '-' && end+1 < this.state.phone_num.length )){
                this.setState({phone_num:e.target.value})
            }
        }   
    }
    sleep(t){
        return new Promise(resolve=>setTimeout(resolve,t));
     }
    registerProduct = ()=>{
        const formData = new FormData();
        formData.append('image',this.state.file);
        formData.append('name',this.state.name);
        formData.append('type',this.state.type);
        formData.append('price',this.state.price);
        formData.append('place',this.state.place);
        let today = new Date();   

        let year = String(today.getFullYear()); // 년도
        let month = String(today.getMonth()+1);  // 월
        let date = String(today.getDate()+this.state.date);  // 날짜
        formData.append('date',year+month+date);
        formData.append('phone',this.state.phone_num);
        formData.append('user_id',this.props.user_id);
        axios.post("http://localhost:8000/register-product", formData)
            .then(({data}) => {
            console.log(data)
        }) ;
    }
    
    render(){
        var _img = '';
        var _price_form = '';
        if(this.props.user_id === -1){
            window.location.href = '/Home';
        }
        
        if(this.state.imgBase64 !== ''){
            _img = <div><br/><Image style={{height:'250px',width:'250px'}} src={this.state.imgBase64} rounded /></div>;
        }

        if(this.state.type === 'fixed'){
            _price_form = <div>
                    <label  style={{fontSize:'25px',color:'#1F618D'}}>Price</label>
                    <InputGroup className="w-25">
                        <Form.Control type="text" placeholder="Product Price" value={this.state.price} onChange={this.priceHandler}/>
                        <InputGroup.Append>
                            <InputGroup.Text>$</InputGroup.Text>
                        </InputGroup.Append>
                        <Form.Text className="text-muted">
                        Please input your product price.
                        </Form.Text>
                    </InputGroup>
                    <br/>
            </div>
        }
        else {
            _price_form = <div>
                    <Row>
                        <Col>
                        <label  style={{fontSize:'25px',color:'#1F618D'}}>Price</label>
                        <InputGroup className="">
                            <Form.Control type="text" placeholder="You may not set a price." value={this.state.price} onChange={this.priceHandler}/>
                            <InputGroup.Append>
                                <InputGroup.Text>$</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                        </Col>
                        <Col>
                        <Form.Group className="" controlId="selling_option">
                        <Form.Label style={{fontSize:'25px' , color:'#1F618D'}}>Auction period (day)</Form.Label>
                        <Form.Control as="select" onChange={this.dateHandler} >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        </Form.Control>
                    </Form.Group>
                        </Col>
                    </Row>
                    <br/>
            </div>
        }
        return (
            <div>
                <div style={{marginLeft:'auto',marginRight:'auto',width:'1000px',marginTop:'30px',backgroundColor:'#EBF5FB',padding:'30px'}}>
               
                <p style={{fontSize:'35px',color:'#154360',textAlign:'center',marginBottom:'40px'}}>Product register</p>
                <Form onSubmit={this.registerProduct} action='/Home'>
                     
                    <Form.Group controlId="product_name">
                        <Form.Label style={{fontSize:'25px' , color:'#1F618D'}}>Name</Form.Label>
                        <Form.Control className="w-50" type="text" placeholder="Product Name" 
                            onChange={e => this.setState({ name: e.target.value })} />
                        <Form.Text className="text-muted">
                        Please input your new product name.
                        </Form.Text>
                    </Form.Group>
                    <br/>

                    <Form.Group>
                        <Form.Label style={{fontSize:'25px',color:'#1F618D'}}>Picture</Form.Label>
                        <Form.File id="exampleFormControlFile1"  onChange={this.imgHandler}/>
                        
                        {_img}
                    </Form.Group>
                    <br/>
                    <Form.Group className="w-25" controlId="selling_option">
                        <Form.Label style={{fontSize:'25px' , color:'#1F618D'}}>Selling Type</Form.Label>
                        <Form.Control as="select" onChange={this.typeHandler}>
                        <option>Fixed price</option>
                        <option>Auction</option>
                        </Form.Control>
                    </Form.Group>
                    <br/>

                    {_price_form}

                    <Form.Group controlId="product_place">
                        <Form.Label style={{fontSize:'25px' , color:'#1F618D'}}>Trading Place</Form.Label>
                        <Form.Control className="w-50" type="text" placeholder="Trading place" 
                            onChange={e => this.setState({ place: e.target.value })} />
                        <Form.Text className="text-muted">
                        Please input your trading place.
                        </Form.Text>
                    </Form.Group>
                    <br/>
                    
                    <Form.Group controlId="ph">
                        <Form.Label style={{fontSize:'25px' , color:'#1F618D'}}>Phone Number</Form.Label>
                        <Form.Control className="w-50" type="text" placeholder="Phone Number" value={this.state.phone_num} 
                            onChange={this.phoneNumHandler} />
                        <Form.Text className="text-muted">
                        Please input your Phone number.
                        </Form.Text>
                    </Form.Group>
                    <br/><br/><br/>
                    <Form.Group as={Row}>
                        <Col sm={{ span: 11, offset: 5 }}>
                            <Button type="submit">Register</Button>
                        </Col>
                    </Form.Group>
                </Form>

                </div>
            </div>
        )
    }
}

export default ProductRegister;