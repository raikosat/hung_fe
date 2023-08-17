import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CreatProductComponent } from './creat-product/creat-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { AccountListComponent } from './account-list/account-list.component';


const routes: Routes = [
  {path: 'product-list',component: ProductListComponent,},
  {path: 'create-product',component: CreatProductComponent,},
  {path: 'update-product/:id',component: UpdateProductComponent,},
  {path: 'account-list',component: AccountListComponent,},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
