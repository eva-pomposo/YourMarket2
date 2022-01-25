import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Product } from './../interfaces/Product';
import { Category } from '../interfaces/Category';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.baseAPIPath + '/product';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    const url = this.baseUrl;
    return this.http.get<Product[]>(url);
  }

  getAll(name = "") {
    if (name !== ""){
      return this.http.get<Product[]>(environment.baseAPIPath + '/product/?search=' + name)
    }
    else{
      return this.http.get<Product[]>(environment.baseAPIPath + '/product')
    }
  }

  getOne(id: number) {
    return this.http.get<Product>(environment.baseAPIPath + '/product/' + id)
  }

  createProduct(category:number, name: string, description: string, price: number) {
    this.http.post<Product>(this.baseUrl + "/", {  "category": category, "name": name, "description": description, "price": price,"isActive": true}, httpOptions).subscribe(response => console.log(response))
  }

  updateProduct(product:Product) {
    console.log(product)
    console.log(product.category.id )
    this.http.put<Product>(this.baseUrl + "/"+ product.id, { "id": product.id, "name": product.name, "description": product.description, "price": product.price, "isActive": product.isActive, "category": product.category.id }, httpOptions).subscribe(response => console.log(response))
  }

}
