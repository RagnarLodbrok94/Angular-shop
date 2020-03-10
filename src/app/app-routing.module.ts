import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './products/cart/cart.component';
import { CheckoutComponent } from './products/checkout/checkout.component';
import { AuthGuard } from './shared/services/auth.guard';
import { ProductPageComponent } from './products/product-page/product-page.component';


const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'product-page', component: ProductPageComponent, canActivate: [ AuthGuard ] },
  { path: 'cart', component: CartComponent, canActivate: [ AuthGuard ] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [ AuthGuard ] },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot( routes ) ],
  exports: [ RouterModule ],
  providers: [ AuthGuard ]
})

export class AppRoutingModule { }
