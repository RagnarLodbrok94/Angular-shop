import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductsComponent } from './../products/products.component';
import { ProductNewComponent } from './product-list/product-new/product-new.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductListItemComponent } from './product-list/product-list-item/product-list-item.component';
import { SearchPipe } from '../shared/pipes/search.pipe';
import { ProductUpdateComponent } from './product-list/product-update/product-update.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductNewComponent,
    ProductListComponent,
    ProductPageComponent,
    CartComponent,
    CheckoutComponent,
    ProductListItemComponent,
    SearchPipe,
    ProductUpdateComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ProductsComponent
  ],
  entryComponents: [
    ProductNewComponent,
    ProductUpdateComponent
  ]
})
export class ProductsModule { }
