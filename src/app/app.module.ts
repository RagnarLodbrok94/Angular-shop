import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { FooterComponent } from './footer/footer.component';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

@NgModule({
  declarations: [
    AppComponent, 
    MenuComponent, FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AuthModule,
    ProductsModule,
    HttpClientModule
  ],
  providers: [ INTERCEPTOR_PROVIDER ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
