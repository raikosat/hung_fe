import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../dialog/dialog-confirm.component';
import { DialogCreateComponent } from '../dialog-create/dialog-create.component';
import { DialogEditComponent } from '../dialog-edit/dialog-edit.component';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  id?:number
  accounts: Account[] = [];
  currentPage: number = 0;
  totalPages: number = 0;
  pageSize?: number
  pageNumber?: number
  searchText:string = '';

  constructor(private accountService: AccountService
    ,private router: Router
    ,public dialog: MatDialog,){}

  ngOnInit(): void {
    console.log(this.searchText)
    // this.getProducts();
    this.fetchProducts()
  }
  fetchProducts(): void {
    console.log(this.searchText);
        this.accountService.getAccountsList(this.searchText, this.currentPage, this.pageSize)
          .subscribe(res => {
            this.accounts =res.content;
            this.totalPages = res.totalPages;
          }, err => console.error());
  }

  updateAccount(account: Account){
    this.accountService.updateAccount(account,account.id).subscribe(data =>{
      this.fetchProducts()
      this.router.navigate(['/product-list'])

    },error => console.error());
  }



  deleteAccount(id: number) {
    console.log(id)
    this.accountService.deleteAccount(id).subscribe(data =>{
      console.log(data)
      this.fetchProducts();
    }, err => console.error());
   }

  goToPage(pageNumber: number): void {
    if (pageNumber >= 0 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.fetchProducts();
    }
  }

  onSearchTextEntered(searchValue: string){
    this.searchText = searchValue;
    this.fetchProducts();
   }

  openDialog(id:number): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
    data:{
      message:"Bạn có chắc chăn muốn xóa tài khoản này không?",
      title: "abc",
    },

    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deleteAccount(id)
      }
    });
  }
  openEditDialog(id: number):
  void {

    const dialogRef = this.dialog.open(DialogEditComponent, {
    data:{
      message:"Account Details",
      title: "",
      productId: id
    },

    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.updateAccount(result);
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
        this.accountService.createAccount(result).subscribe(data =>{
          this.fetchProducts()
          this.router.navigate(['/product-list']);
        },error => console.error());
      }
    });
  }

}
