import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import '../../App.scss';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';
import InnerImageZoom from 'react-inner-image-zoom';

function ProductDetail({match}) {
    // item state variable will hold an object
    const [item, setItem] = useState({});
    useEffect(()=>{
        fetchItem();
    },[]);
    const fetchItem = async ()=>{
        const data = await fetch(`https://fakestoreapi.com/products/${match.params.id}`);
        const item = await data.json();
        setItem(item);
    }

    return (
        <div className="singleItem">
            <Container>
                <Row>
                    <Col md={{ size: 4, offset: 1 }}>
                    <div className="singleThumb">
                        {/* <img src={item.image} className="img-fluid"/> */}
                        <InnerImageZoom src={item.image} zoomSrc={item.image} className="single-product-img"/>
                    </div>
                    </Col>
                    <Col md="6">
                        <div className="single-product-right">
                            <h1 className="singleProductTitle">{item.title}</h1>
                            <ul>
                                <li>Price: <span>${item.price}</span></li>
                                <li>Category: <span>{item.category}</span></li>
                            </ul>
                            <section className="singleProductDesc">
                                <h4>Description:</h4>
                                <p>{item.description}</p>
                            </section>
                            <Link to="/" className="btn btn-lg btn-success">Add to Cart</Link>
                        </div>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default ProductDetail
