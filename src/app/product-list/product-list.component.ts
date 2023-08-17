import { ProductService } from './../product.service';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Product } from '../product';
import { Router } from '@angular/router';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
import { DialogConfirmComponent } from '../dialog/dialog-confirm.component';
import { DialogEditComponent } from '../dialog-edit/dialog-edit.component';
import { FormGroup } from '@angular/forms';
import { DialogCreateComponent } from '../dialog-create/dialog-create.component';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{



  id?:number
  products: Product[] = [];
  currentPage: number = 0;
  totalPages: number = 0;
  pageSize?: number
  pageNumber?: number
  searchText:string = '';
  product: Product = new Product();

  constructor(private productService: ProductService
              ,private router: Router
              ,public dialog: MatDialog,){}


  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['searchText']) {
  //     this.searchText = changes['searchText'].currentValue;
  //   }
  // }

  ngOnInit(): void {
    console.log(this.searchText)
    // this.getProducts();
    this.fetchProducts()
  }

  fetchProducts(): void {
  //   if (this.searchText) {
  //     // Thực hiện tìm kiếm và phân trang dựa trên searchText
  //     console.log(this.searchText);
  //     this.productService.searchProduct(this.searchText, this.currentPage, this.pageSize)
  //       .subscribe(res => {
  //         this.products =res.content;
  //         this.totalPages = res.length;
  //       }, err => console.error());
  //   } else {
  //   this.productService.getProductsList(this.currentPage, this.pageSize).subscribe(res => {
  //     this.products = res.content;
  //     this.totalPages= res.totalPages;
  //   });
  // }

        // Thực hiện tìm kiếm và phân trang dựa trên searchText
        console.log(this.searchText);
        this.productService.getProductsList(this.searchText, this.currentPage, this.pageSize)
          .subscribe(res => {
            this.products =res.content;
            this.totalPages = res.totalPages;
          }, err => console.error());

  }
  goToPage(pageNumber: number): void {
    if (pageNumber >= 0 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.fetchProducts();
    }
  }

  // private getProducts(){
  //   this.productService.getProductsList().subscribe(res => {
  //     console.log(res);
  //     this.products = res.content;
  //   }
  //     );
  // }

  updateProduct(product: Product){
    this.productService.updateProduct(product,product.id).subscribe(data =>{
      this.fetchProducts()
      this.router.navigate(['/product-list'])

    },error => console.error());
  }

  // saveProduct(){
  //   this.productService.createProduct(this.product).subscribe( data =>{
  //     console.log(data);
  //     this.fetchProducts()
  //     this.router.navigate(['/list']);
  //   },
  //   error => console.error());
  // }

  deleteProduct(id: number) {
    console.log(id)
    this.productService.deleteProduct(id).subscribe(data =>{
      console.log(data)
      this.fetchProducts();
    }, err => console.error());
   }

  // searchProducts(): void {
  //   console.log(this.searchText);
  //   const results: Product[] = [];
  //   for (const product of this.products){
  //     if(product.name?.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1
  //     || product.brand?.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1
  //     || product.color?.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1) {
  //       results.push(product);
  //     }
  //   }
  //   this.products = results;
  //   if(results.length === 0 || !this.searchText){
  //     this.getProducts();
  //   }
  //  }



   onSearchTextEntered(searchValue: string){
    // this.searchText = searchValue;
    // console.log(this.searchText);
    // this.productService.searchProduct(this.searchText).subscribe(data => {
    //   console.log(data);
    //   this.products=data;
    // }, err => console.error());
    this.searchText = searchValue;
    this.fetchProducts();
   }

   openDialog(id:number): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
    data:{
      message:"Bạn có chắc chăn muốn xóa sản phẩm này không?",
      title: "abc",
    },

    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deleteProduct(id)
      }
    });
  }
  openEditDialog(id: number):
  void {

    const dialogRef = this.dialog.open(DialogEditComponent, {
    data:{
      message:"Product Details",
      title: "",
      productId: id
    },

    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.updateProduct(result);
      }
    });
  }

  openCreateDialog():
  void {

    const dialogRef = this.dialog.open(DialogCreateComponent, {
    data:{
      message:"Enter Product's Information",
      title: "",
    },

    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log(result);
        this.productService.createProduct(result).subscribe(data =>{
          this.fetchProducts()
          this.router.navigate(['/product-list']);
        },error => console.error());
      }
    });
  }
}
