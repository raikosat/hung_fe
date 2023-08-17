import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  id?: number
  product: Product = new Product();
  constructor( private productService:ProductService
              ,private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id']
    this.productService.getProdutById(this.id).subscribe(data =>{
      this.product = data;

    },error => console.error());
  }

  onSubmit(){
    this.productService.updateProduct(this.product,this.id).subscribe(data =>{
      this.goToProductList();

    },error => console.error());
  }

  goToProductList(){
    this.router.navigate(['/list'])
   }

}
