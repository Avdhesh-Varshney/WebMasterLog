import React from "react";
import CardItem from "./CardItem";
import "./Cards.scss";

import img01 from "../images/img-1.jpg";
import img02 from "../images/img-2.jpg";
import img03 from "../images/img-3.jpg";
import img04 from "../images/img-4.jpg";
import img08 from "../images/img-8.jpg";


function Cards() {
  return (
    <div className="cards">
      <h1>Look at these wonderful destinations :)</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              itemImageSrc={img01}
              itemText="First Destination place to visit by hiking"
              itemLabel='Adventure'
              path="/services"
            />
            <CardItem
              itemImageSrc={img02}
              itemText="Second Destination place to visit by cruise"
              itemLabel='Luxury'
              path="/services"
            />
          </ul>
          <ul className="cards__items">
            <CardItem
              itemImageSrc={img03}
              itemText="Third Destination place to visit"
              itemLabel='Adventure'
              path="/services"
            />
            <CardItem
              itemImageSrc={img04}
              itemText="A great stadim in a remote place"
              itemLabel='Luxury'
              path="/services"
            />
            <CardItem
              itemImageSrc={img08}
              itemText="Brutal Desart of Sahara"
              itemLabel='Thrilling'
              path="/services"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
