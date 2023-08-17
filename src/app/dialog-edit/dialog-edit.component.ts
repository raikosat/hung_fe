import { Product } from './../product';
import { Component, Inject, Input } from '@angular/core';
import { DialogType } from '../dialogtype';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrls: ['./dialog-edit.component.css']
})

export class DialogEditComponent {

  id?: number
  productForm: FormGroup= new FormGroup({});


  constructor(
    public dialogRef: MatDialogRef<DialogEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogType,
    private productService: ProductService
    ,private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  async ngOnInit(): Promise<void> {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      amount: ['', Validators.required],
      color: ['', Validators.required],
      brand: ['', Validators.required]
    });

    try {
      const data = await this.productService.getProdutById(this.data.productId).toPromise();
      this.id = data?.id;

      this.productForm.patchValue({
        name: data?.name,
        price: data?.price,
        amount: data?.amount,
        color: data?.color,
        brand: data?.brand,
      });
    } catch (error) {
      console.error(error);
    }


  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    if (this.productForm.valid) {
      const product = {
        id: this.id,
        name : this.productForm.controls['name'].value,
        price : this.productForm.controls['price'].value,
        amount: this.productForm.controls['amount'].value,
        color: this.productForm.controls['color'].value,
        brand: this.productForm.controls['brand'].value,
      }

      this.dialogRef.close(product);
    }
  }


}
