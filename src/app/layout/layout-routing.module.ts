import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { SearchProductComponent } from './pages/search-product/search-product.component';
import { AuthGuard } from './guards/auth.guard';
import { EmptyPageComponent } from './pages/empty-page/empty-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { CartComponent } from './pages/cart/cart.component';
import {ProductAddComponent} from './pages/product-add/product-add.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ProductResolver } from './resolver/product.resolver';
import { ProductsResolver } from './resolver/products.resolver';

// Holds the route of the module.
const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: MainPageComponent,
    children: [
      {
        path: 'search', component: SearchProductComponent, resolve: {
          productList: ProductsResolver
        }
      }, {
        path: 'search/:productId', component: ProductDetailComponent, resolve: {
          product: ProductResolver
        }
      },
      { path: '', redirectTo: 'search', pathMatch: 'full' },
    ],
  },
  {
    path: 'fav',
    component: CartComponent,
    data :{ type:"favItems"},
    canActivate: [AuthGuard]
  },{
    path: 'watchLater',
    component: CartComponent,
    data :{ type:"watchLaterItems"},
    canActivate: [AuthGuard]
  },{
    path: 'productAdd',
    component: ProductAddComponent,
    canActivate: [AuthGuard]
  },{
    path: 'watched',
    component: CartComponent,
    data :{ type:"watchedItems"},
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: EmptyPageComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule { }
