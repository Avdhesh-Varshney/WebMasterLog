import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ShopService } from '../shop.service';
import { Product } from '../Product';

@Component({
  selector: 'app-eshop',
  templateUrl: './eshop.component.html',
  styleUrls: ['./eshop.component.css']
})
export class EshopComponent {

 allProducts = this.service.getProduct();
 quantity: number =0;
 myItems: Product[] = [];

 constructor(private service: ShopService, private router: Router){

 }

 ngOnInit(){
  this.myItems=this.service.getProduct();
 }

 reduceQuantity(index: number){
   this.myItems[index].quantity--;  
 }


}
