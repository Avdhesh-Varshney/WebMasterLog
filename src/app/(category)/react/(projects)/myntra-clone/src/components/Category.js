// src/components/Category.js
import React from 'react';
import './Category.css';

const categories = [
  { img: '/assets/category1.png', name: 'Category 1' },
  { img: '/assets/category2.png', name: 'Category 2' },
  { img: '/assets/category3.png', name: 'Category 3' },
  { img: '/assets/category4.png', name: 'Category 4' },
  { img: '/assets/category5.png', name: 'Category 5' },
  { img: '/assets/category6.png', name: 'Category 6' },
  { img: '/assets/category7.png', name: 'Category 7' },
  { img: '/assets/category8.png', name: 'Category 8' },
  { img: '/assets/category9.png', name: 'Category 9' },
  { img: '/assets/category10.png', name: 'Category 10' },
  { img: '/assets/category11.png', name: 'Category 11' },
  { img: '/assets/category12.png', name: 'Category 12' },
  { img: '/assets/category13.png', name: 'Category 13' },
  { img: '/assets/category14.png', name: 'Category 14' },
  { img: '/assets/category15.png', name: 'Category 15' },
  { img: '/assets/category16.png', name: 'Category 16' },
  { img: '/assets/category17.png', name: 'Category 17' },
  { img: '/assets/category18.png', name: 'Category 18' },
  { img: '/assets/category19.png', name: 'Category 19' },
  { img: '/assets/category20.png', name: 'Category 20' },
  { img: '/assets/category21.png', name: 'Category 21' },
  { img: '/assets/category22.png', name: 'Category 22' },
  { img: '/assets/category23.png', name: 'Category 23' },
  { img: '/assets/category24.png', name: 'Category 24' },
  { img: '/assets/category25.png', name: 'Category 25' },
  { img: '/assets/category26.png', name: 'Category 26' },
  { img: '/assets/category27.png', name: 'Category 27' },
  { img: '/assets/category28.png', name: 'Category 28' },
  { img: '/assets/category29.png', name: 'Category 29' },
  { img: '/assets/category30.png', name: 'Category 30' },
  { img: '/assets/category31.png', name: 'Category 31' },
  { img: '/assets/category32.png', name: 'Category 32' },
  { img: '/assets/category33.png', name: 'Category 33' },
];

const Category = () => {
  return (
    <div className="category-container">
      <h2>Shop by Category</h2>
      <div className="category-cards">
        {categories.map((category, index) => (
          <div key={index} className="category-card">
            <img src={category.img} alt={category.name} />
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
