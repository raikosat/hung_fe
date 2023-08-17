import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseURL = "http://localhost:8081/api/v1/products";

  constructor(private httpClient: HttpClient) { }

  getProductsList(name: string ,page: number = 0, size: number = 5 ): Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}?name=${name}&page=${page}&size=${size}`);
  }

  createProduct(product: Product): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`,product);
  }

  getProdutById(id?: number): Observable<Product>{
    return this.httpClient.get<Product>(`${this.baseURL}/${id}`);
  }

  updateProduct(product: Product, id?: number): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`,product);
  }

  deleteProduct(id?: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }


}
