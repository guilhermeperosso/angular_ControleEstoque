import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map } from 'rxjs';
import { CreateProductRequest } from 'src/app/models/interfaces/products/request/CreateProductRequest';
import { EditProductRequest } from 'src/app/models/interfaces/products/request/EditProductRequest';
import { SellProductRequest } from 'src/app/models/interfaces/products/request/SellProductRequest';
import { CreateProductResponse } from 'src/app/models/interfaces/products/response/CreateProductResponse';
import { DeleteProductResponse } from 'src/app/models/interfaces/products/response/DeleteProductResponse';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';
import { SellProductResponse } from 'src/app/models/interfaces/products/response/SellProductResponse';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private API_URL = environment.API_URL;
  private JWT_TOKEN = this.cookie.get('USER_INFO');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`,
    }),
  };

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
  ) {}

  getAllProducts(): Observable<Array<GetAllProductsResponse>> {
    return this.http
      .get<
        Array<GetAllProductsResponse>
      >(`${this.API_URL}/products`, this.httpOptions)
      .pipe(map((product) => product.filter((data) => data?.amount > 0)));
  }

  deleteProduct(product_id: string): Observable<DeleteProductResponse> {
    return this.http.delete<DeleteProductResponse>(
      `${this.API_URL}/product/delete`,
      {
        ...this.httpOptions,
        params: {
          product_id: product_id,
        },
      },
    );
  }

  createProduct(
    requestData: CreateProductRequest,
  ): Observable<CreateProductResponse> {
    return this.http.post<CreateProductResponse>(
      `${this.API_URL}/product`,
      requestData,
      this.httpOptions,
    );
  }

  editProduct(requestData: EditProductRequest): Observable<void> {
    return this.http.put<void>(
      `${this.API_URL}/product/edit`,
      requestData,
      this.httpOptions,
    );
  }

  sellProduct(
    requestData: SellProductRequest,
  ): Observable<SellProductResponse> {
    return this.http.put<SellProductResponse>(
      `${this.API_URL}/product/sale`,
      { amount: requestData?.amount },
      {
        ...this.httpOptions,
        params: {
          product_id: requestData.product_id,
        },
      },
    );
  }
}
