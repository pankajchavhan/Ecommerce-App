import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './ui/navbar/header.component';
import { ProductsComponent } from './ui/products/products.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/Http';
import { FilterPipe } from './shared/filter.pipe';
import { ViewProductDetailsComponent } from './ui/products/view-product-details/view-product-details.component';
import { SharedModule } from './shared/module/shared.module';
import { SpinnerComponent } from './ui/spinner/spinner.component';
import { PageNotFoundComponent } from './ui/page-not-found/page-not-found.component';
import { ErrorComponent } from './ui/error/error/error.component';
import {GlobalErrorHandlerInterceptor} from './interceptor/global-error-handler.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    FilterPipe,
    ViewProductDetailsComponent,
    SpinnerComponent,
    PageNotFoundComponent,
    ErrorComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, SharedModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalErrorHandlerInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
