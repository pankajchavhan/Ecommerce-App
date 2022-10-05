import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './ui/navbar/header.component';
import { ProductsComponent } from './ui/products/products.component';
import { HttpClientModule } from '@angular/common/Http';
import { CartService } from './service/cart.service';
import { ProductsService } from './service/products.service';
import { FilterPipe } from './shared/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewProductDetailsComponent } from './ui/products/view-product-details/view-product-details.component';
import {SharedModule} from './shared/module/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    FilterPipe,
    ViewProductDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [CartService, ProductsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
