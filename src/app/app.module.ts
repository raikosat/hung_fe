import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CreatProductComponent } from './creat-product/creat-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateProductComponent } from './update-product/update-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogConfirmComponent } from './dialog/dialog-confirm.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { DialogEditComponent } from './dialog-edit/dialog-edit.component';
import { AccountListComponent } from './account-list/account-list.component';
import { DialogCreateComponent } from './dialog-create/dialog-create.component';
import { DialogAccountcreateComponent } from './dialog-accountcreate/dialog-accountcreate.component';
import { DialogAccounteditComponent } from './dialog-accountedit/dialog-accountedit.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CreatProductComponent,
    UpdateProductComponent,
    DialogConfirmComponent,
    SearchComponent,
    LoginComponent,
    DialogEditComponent,
    AccountListComponent,
    DialogCreateComponent,
    DialogAccountcreateComponent,
    DialogAccounteditComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
