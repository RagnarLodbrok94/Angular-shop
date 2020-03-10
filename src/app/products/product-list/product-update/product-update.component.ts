import { Component, OnInit } from '@angular/core';
import { EventBusService } from 'src/app/shared/services/event-bus.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomErrorStateMatcher } from 'src/app/shared/services/error-matcher.service';
import { MatDialogRef } from '@angular/material';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {
  productEdit: Product;
  form: FormGroup;
  submitted: boolean = false;
  errorMatcher = new CustomErrorStateMatcher();

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductUpdateComponent>,
    private productService: EventBusService
  ) { }

  ngOnInit() {
    this.productService.getProductEgit().subscribe( product => {
      this.form = this.fb.group({
        image: [ product.imageUrl, Validators.required ],
        name: [ product.name, Validators.required ],
        price: [ product.price, Validators.required ],
      })
    });
  }

  submit() {
    if( this.form.invalid ) return;

    this.submitted = true;

    const product: Product = {
      imageUrl: this.form.value.image,
      name: this.form.value.name,
      price: this.form.value.price,
      date: new Date
    }

    // this.onSubmit.emit( product );
    this.form.reset();
    this.submitted = false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
