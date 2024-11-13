import React,{useState, useEffect} from 'react'
import { Container, Row, Col } from 'reactstrap';
import '../../App.scss';
import {Link} from 'react-router-dom'; 
import Loader from '../Loader';


function Products() {

    useEffect(() => {
        fetchItems()
    }, []);
    // following state variable will hold the actual array of datas
    const [items, setItems] = useState([]);
    // for loader to open or close
    const [open, setOpen] = useState(true);
    // following method is fetching the products data.
    const fetchItems = async ()=>{
        try{
            const data = await fetch(`https://fakestoreapi.com/products`);
            const items = await data.json();
            console.log(items);
            setItems(items);
            setOpen(false);
        }catch(error){
            console.log(error);
        }
    }
    // to show the backdrop untill the page is loaded 
    const renderBackdrop = ()=>{
        if(open){
        return (
            <Loader open/>
            )
        }else{
            return;
        }
    }

    return (
        <div className="product-lists">
            {renderBackdrop()}
            <h1 className="products">Products</h1>
            <Container>
                <Row>
                    <Col xs="12">
                        <div className="products-container">
                            {
                                items.map((item, index)=>{
                                    return(
                                        <article className={`product product-${item.id}`} key={index}>
                                            <img src={item.image} className="product-img img-fluid"/>
                                            <div className="product-info">
                                                <Link to={`/products/${item.id}`} className="single-product-link"><h4 className="text-center product-name">{item.title}</h4></Link>
                                                <h5 className="text-center product-price">{`$${item.price}`}</h5>
                                            </div>
                                        </article>
                                    )
                                })
                            }
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Products
