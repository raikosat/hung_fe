import { ProductService } from './../product.service';
import { Product } from './../product';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creat-product',
  templateUrl: './creat-product.component.html',
  styleUrls: ['./creat-product.component.css']
})
export class CreatProductComponent implements OnInit {

  product: Product = new Product();

  constructor(private productService: ProductService, private router: Router){ }


  ngOnInit(): void {

  }

  saveProduct(){
    this.productService.createProduct(this.product).subscribe( data =>{
      console.log(data);
      this.goToProductList();
    },
    error => console.error());
  }

   onSubmit(){
    console.log(this.product);
    this.saveProduct();
   }

   goToProductList(){
    this.router.navigate(['/product-list'])
   }
}
