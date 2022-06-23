import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  create(product: Product) {
    return this.http.post<Product>(environment.apiUrl + '/products', product);
  }

  getProductList() {
    return this.http.get<Array<Product>>(environment.apiUrl + '/products');
  }
  createSharedProduct(sharedProduct: SharedProduct) {
    return this.http.post<SharedProduct>(
      environment.apiUrl + '/shared_products',
      sharedProduct
    );
  }
  deleteSharedProduct(id: number) {
    return this.http.delete(environment.apiUrl + '/shared_products/' + id);
  }

  shareWithUser(id: number) {
    return this.http.get(environment.apiUrl + '/sharedWithMe/' + id);
  }
}

export interface Product {
  name: string;
  id?: number;
}

export interface SharedProduct {
  product: Product | string;
  user?: User | String;
  sharedWith?: User | String;
}
