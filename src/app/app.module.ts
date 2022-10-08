import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './ui/navbar/header.component';
import { ProductsComponent } from './ui/products/products.component';
import { HttpClientModule } from '@angular/common/Http';
import { FilterPipe } from './shared/filter.pipe';
import { ViewProductDetailsComponent } from './ui/products/view-product-details/view-product-details.component';
import { SharedModule } from './shared/module/shared.module';
import { SpinnerComponent } from './ui/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    FilterPipe,
    ViewProductDetailsComponent,
    SpinnerComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
