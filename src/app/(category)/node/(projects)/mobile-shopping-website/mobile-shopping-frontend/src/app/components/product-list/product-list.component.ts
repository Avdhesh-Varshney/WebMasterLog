import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Product {
    id:number,
    brand: string;
    model: string;
    price: number;
    imageUrl: string;
    description: string;
}

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
    imports: [CommonModule, FormsModule, RouterModule],
    standalone: true
})
export class ProductListComponent implements OnInit {
    products: Product[] = [];
    private demoProducts: Product[] = [
        {   id:1,
            brand: 'Apple',
            model: 'iPhone 16',
            price: 999.99,
            imageUrl: '/assets/images/image2.webp', 
            description: 'The latest iPhone with advanced features and stunning design.'
        },
        {
            id:2,
            brand: 'Samsung',
            model: 'Galaxy S22',
            price: 799.99,
            imageUrl: '/assets/images/image3.jpeg', 
            description: 'A powerful smartphone with an amazing camera and display.'
        },
        {
            id:3,
            brand: 'OnePlus',
            model: 'OnePlus 10 Pro',
            price: 899.99,
            imageUrl: '/assets/images/image4.jpeg', 
            description: 'Experience flagship performance with the OnePlus 10 Pro.'
        },
        {
            id:4,
            brand: 'Google',
            model: 'Pixel 6',
            price: 599.99,
            imageUrl: '/assets/images/image6.jpeg', 
            description: 'The best of Google in a smartphone with an incredible camera.'
        },
        {
            id:5,
            brand: 'Xiaomi',
            model: 'Mi 11',
            price: 749.99,
            imageUrl: '/assets/images/image7.jpeg', 
            description: 'A flagship smartphone with a stunning display and performance.'
        },
        {
            id:6,
            brand: 'Sony',
            model: 'Xperia 1 III',
            price: 1299.99,
            imageUrl: '/assets/images/xperia1iii.jpeg', 
            description: 'A premium smartphone with professional-grade camera features.'
        },
    ];

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.productService.getProducts().subscribe(
            data => {
                // Combine demo products with fetched products
                this.products = [...this.demoProducts, ...data];
            },
            error => {
                console.error('Error fetching products', error);
                // Fallback to demo products in case of an error
                this.products = this.demoProducts;
            }
        );
    }
}