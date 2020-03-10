import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/shared/models/product.model';
import { CustomErrorStateMatcher } from 'src/app/shared/services/error-matcher.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.scss']
})
export class ProductNewComponent implements OnInit {
  @Output() onSubmit: EventEmitter<Product> = new EventEmitter();

  form: FormGroup;
  submitted: boolean = false;
  errorMatcher = new CustomErrorStateMatcher();

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductNewComponent>
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      image: [ '', Validators.required ],
      name: [ '', Validators.required ],
      price: [ '', Validators.required ],
    })
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

    this.onSubmit.emit( product );
    this.form.reset();
    this.submitted = false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
