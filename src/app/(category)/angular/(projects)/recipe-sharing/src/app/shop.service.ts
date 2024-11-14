import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from './form.service';
import { Product } from './Product';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  updatedProduct : Product = new Product();

  public products: Product[] = [
    {"id": 1, "name": "Product 1", "quantity": 10},
    {"id": 2, "name": "Product 2", "quantity": 20},
    {"id": 3, "name": "Product 3", "quantity": 30}
  ];

  constructor(private service: FormService, private router: Router){

  }

  ngOnInit(){
   
  }

  getProduct(): Product[]{
    return this.products; 
  }

  setNewProduct(quantity:number){
    console.log(quantity);
    this.updatedProduct.quantity=quantity;
    this.router.navigate(['eshop'])
  }

  getNewProduct(): Product{
    return this.updatedProduct;
  }
  
}
