import React,{useState, useEffect} from 'react'
import styled from "styled-components";
import { Container, Row, Col } from 'reactstrap';
import {Link} from 'react-router-dom';
import ImageSlider from '../ImageSlider';
import servicesData from '../../services-data';
import '../../App.scss';
import Loader from '../Loader';


// specifying our image path.
const imagePath = process.env.PUBLIC_URL + '/images/';


// a functional sub component that create various types of buttons.
const TagButton = ({name, handleSetTag, tagActive})=>{

    return(
        <button className={`tag ${tagActive ? 'active': null}`} onClick={()=>handleSetTag(name)}>
            {name.toUpperCase()}
        </button>
    );

}

function Services() {
    // state variables for changing tags and filtering services.
    const [tag, setTag] = useState('all');
    const [filteredServices, setFilteredServices] = useState([]);
    // for loader to open or close
    const [open, setOpen] = useState(true);

    useEffect(
        () => {
            // destination filtering is done.
            tag === 'all' ? setFilteredServices(servicesData) : setFilteredServices(servicesData.filter(service => service.tag === tag));
        }, [tag])
    
    // following useState is for loader 
    useEffect(()=>{
        setInterval(() => {
            if (document.readyState === 'complete') {
                setOpen(false);
            }
          }, 100);
    },[])

    return (
        <div className="services">
            {open===true ? <Loader open/>: <Loader />}
            <h1 className="services-banner">Services</h1>
            <Container>
                <Row>
                    <Col xs="12">
                        <div className="tags">
                            <TagButton name="all" tagActive={tag === 'all' ? true : false} handleSetTag={setTag} />
                            <TagButton name="hotel" tagActive={tag === 'hotel' ? true : false} handleSetTag={setTag} />
                            <TagButton name="villa" tagActive={tag === 'villa' ? true : false} handleSetTag={setTag} />
                        </div>
                    </Col>
                    <Col xs="12">
                    <section className="services-data">
                        {filteredServices.map((service,index)=>{
                            var imgArr = new Array();
                            return(
                                <div key={service.id} className="service-card" data-index={index}>
                                    <Row>
                                    <Col md="6" style={{'paddingRight': '0px'}}>
                                        {
                                            service.images.map((image)=> imgArr.push(`${image.src}`))
                                        }
                                        <ImageSlider images={imgArr} className="service-slider-images">
                                                <div
                                                    style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    color: "#fff",
                                                    }}
                                                    className="slider-caption"
                                                >
                                                <h1>{service.name}</h1>
                                                <p>{service.Setting}</p>
                                            </div>
                                        </ImageSlider>
                                    {/* <img className="serviceImage img-fluid" src={`${imagePath}${service.images[0].src}`} alt={`${service.images[0].title}${service.images[0].description}`} /> */}
                                    </Col>
                                    <Col md="6" className="service-data" style={{'paddingLeft': '15px'}}>
                                        <Col xs="12">
                                            <h3 className="service-data-heading">
                                                {service.name}
                                            </h3>
                                        </Col>
                                        <Col xs="12">
                                            <div className="service-data-style">
                                                <p>Style: </p>
                                                <p>{service.style}</p>
                                            </div>
                                        </Col>
                                        <Col xs="12">
                                        <div className="service-data-setting">
                                            <p>Setting: </p>
                                            <p>{service.Setting}</p>
                                        </div>
                                        </Col>
                                        <Col xs="12">
                                        <div className="service-data-tag">
                                            <p>Setting: </p>
                                            <p>{service.tag}</p>
                                        </div>
                                        </Col>
                                        <Col xs="12">
                                        <div className="service-data-price">
                                            <p>Price per night from: </p>
                                            <p>{`$${service.price}`}</p>
                                        </div>
                                        </Col>
                                        <Col xs="12">
                                            <Link to={`/services/${service.id}`} className="view-service-btn">More...</Link>
                                        </Col>
                                    </Col>
                                    </Row>
                                </div>
                            )
                        })}
                    </section>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Services
