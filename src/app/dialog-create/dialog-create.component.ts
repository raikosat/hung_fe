import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogEditComponent } from '../dialog-edit/dialog-edit.component';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { DialogType } from '../dialogtype';

@Component({
  selector: 'app-dialog-create',
  templateUrl: './dialog-create.component.html',
  styleUrls: ['./dialog-create.component.css']
})
export class DialogCreateComponent {
  productForm: FormGroup= new FormGroup({});

  constructor(
    public dialogRef: MatDialogRef<DialogCreateComponent>,
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
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    if (this.productForm.valid) {
      const product = {
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
