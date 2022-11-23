import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './ui/products/products.component';
import { PageTitle } from './enums/page-title';
import { RoutePaths } from './enums/rout-path';
import {ViewProductDetailsComponent} from './ui/products/view-product-details/view-product-details.component';
import {PageNotFoundComponent} from './ui/page-not-found/page-not-found.component';
import {ErrorComponent} from './ui/error/error/error.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:RoutePaths.PRODUCTS,
    pathMatch:'full'
  },
  {
    path: RoutePaths.PRODUCTS,
    component:ProductsComponent,
    data: { title: PageTitle.PRODUCTS_PAGE }
  },
  {
    path: RoutePaths.PRODUCT_DETAILS,
    component:ViewProductDetailsComponent,
    data: { title: PageTitle.PRODUCT_DETAILS_PAGE }
  },
  {
    path: RoutePaths.SERVER_ERROR,
    component:ErrorComponent,
    data: { title: PageTitle.ERROR_PAGE }
  },
  { 
    path: RoutePaths.CART, 
    loadChildren: () => import('./ui/cart/cart.module').then(m => m.CartModule) 
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
