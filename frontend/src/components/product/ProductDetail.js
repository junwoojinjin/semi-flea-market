import {Form,Container,Row,Col,Image,Button} from 'react-bootstrap';
import React, {Component} from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';


class ProductDetail extends Component {
    state = {
        
        name:'',
        user_name:'',
        seller_id:'',
        price:0,
        place:'',
        phone_num:'',
        date:1,
        p_path:'',
        selling:'',
        check_wish:false
    }
    componentDidMount(){
        axios.post("http://localhost:8000/product-detail", {p_id:this.props.p_id})
        .then(({data}) => {
        this.setState({
            name:data.name,
            user_name:data.user_name,
            price:data.price,
            type:data.type,
            place:data.place,
            phone_num:data.phone_num,
            p_path:data.picture_path,
            date:data.date,
            selling:data.selling,
            seller_id:data.user_id
        });
        });

        axios.post("http://localhost:8000/product-wish", 
        {
            check:'first',
            p_id:this.props.p_id,
            user_id:this.props.user_id
        })
        .then(({data}) => {
            console.log(data)
            if(data.check){
                this.setState({check_wish:true});
            }
        });
    }

    buyProduct(){
        if(this.props.user_id === -1){
            alert('Please Login First!');
        }
        else if(this.props.user_id === this.state.seller_id){
            alert('Impossible! This is your product.');
        }
        else{
            let today = new Date();   

            let year = String(today.getFullYear()); // 년도
            let month = String(today.getMonth()+1);  // 월
            let date = String(today.getDate());  // 날짜
                        
            let hours = String(today.getHours()); // 시
            let minutes = String(today.getMinutes());  // 분
            let time = year+'-'+month+'-'+date+' '+hours+':'+minutes;
            axios.post("http://localhost:8000/product-buy", 
            {
                p_id:this.props.p_id,
                user_id:this.props.user_id,
                time:time
            })
            .then(({data}) => {
                console.log(data)
                window.location.href = "/HOME"
            })
        }
    }

    registerWish(){
        if(this.props.user_id === -1){
            alert('Please Login First!');
        }
        else if(this.props.user_id === this.state.seller_id){
            alert('Impossible! This is your product.');
        }
        else if(this.state.check_wish){
            axios.post("http://localhost:8000/product-wish", 
            {
                check:'delete',
                p_id:this.props.p_id,
                user_id:this.props.user_id
            })
            .then(({data}) => {
                console.log(data)
                this.setState({check_wish:false})
            })
        }
        else{
            axios.post("http://localhost:8000/product-wish", 
            {
                check:'register',
                p_id:this.props.p_id,
                user_id:this.props.user_id
            })
            .then(({data}) => {
                console.log(data)
                this.setState({check_wish:true})
            })
        }
    }
    render(){
        var _buttons = '';

        if (this.state.selling === 1 && this.state.check_wish){
            _buttons = <Row className="justify-content-md-center" style={{marginTop:'30px'}}>
            <Col xs lg="2" style={{textAlign:'center'}} >
                <Button  size="lg" variant="outline-primary" onClick={()=>{this.buyProduct()}}>Buy Now</Button>
            </Col>
            <Col md="auto"></Col>
            <Col xs lg="2" style={{textAlign:'center'}}>
            <Button size="lg" variant="primary" onClick={()=>{this.registerWish()}} >My Wish</Button>
            </Col>
        </Row>;

        }
        else if(this.state.selling === 1){
            _buttons = <Row className="justify-content-md-center" style={{marginTop:'30px'}}>
            <Col xs lg="2" style={{textAlign:'center'}} >
                <Button  size="lg" variant="outline-primary" onClick={()=>{this.buyProduct()}}>Buy Now</Button>
            </Col>
            <Col md="auto"></Col>
            <Col xs lg="2" style={{textAlign:'center'}}>
            <Button size="lg" variant="outline-primary" onClick={()=>{this.registerWish()}} >To Wish List</Button>
            </Col>
        </Row>;
        }
        else{
            _buttons = <Row className="justify-content-md-center">
                <p style={{fontSize:'25px',color:'red'}}>SOLD OUT</p>
            </Row>
        }
        return (
            <div>
                <div style={{marginLeft:'auto',marginRight:'auto',width:'1280px',marginTop:'30px',backgroundColor:'#EBF5FB',padding:'30px'}}>
               
                <p style={{fontSize:'40px',color:'#154360',textAlign:'center',marginBottom:'40px'}}>Product Detail</p>
                <Container>
                    <Row className="justify-content-md-center">
                        <Image style={{height:'300px'}} src={'http://localhost:8000/product_img/'+this.state.p_path} rounded></Image>
                    </Row>
                    <Row className="justify-content-md-center">
                        <p style={{fontSize:'25px',color:'#1F618D'}}>{this.state.name}</p>
                    </Row>
                    <Row className="justify-content-md-center">
                        <p style={{fontSize:'25px',color:'#1F618D',marginTop:'10px'}}>Price: &nbsp;&nbsp;</p> <p style={{fontSize:'40px',color:'#CB4335',display:'inline'}}>{this.state.price}$</p>
                    </Row>
                    <Row className="justify-content-md-center">
                        <p style={{fontSize:'25px',color:'#1F618D'}}>Trading Place: &nbsp;&nbsp;</p> <p style={{fontSize:'25px',color:'#00000',display:'inline'}}>{this.state.place}</p>
                    </Row>
                    
                    <Row className="justify-content-md-center">
                        <p style={{fontSize:'25px',color:'#1F618D'}}>Seller: &nbsp;&nbsp;</p> <p style={{fontSize:'25px',color:'#00000',display:'inline'}}>{this.state.user_name}</p>
                    </Row>

                    <Row className="justify-content-md-center">
                        <p style={{fontSize:'25px',color:'#1F618D'}}>Phone-Number: &nbsp;&nbsp;</p> <p style={{fontSize:'25px',color:'#00000',display:'inline'}}>{this.state.phone_num}</p>
                    </Row>
                    {_buttons}
                    
                </Container>
                </div>
            </div>
        )
    }
}

export default ProductDetail;