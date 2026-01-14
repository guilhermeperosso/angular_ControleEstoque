import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { map, Observable } from 'rxjs';

import { DeleteCategoryResponse } from 'src/app/models/interfaces/categories/response/DeleteCategoryResponse';
import { GetAllCategoriesResponse } from 'src/app/models/interfaces/categories/response/GetAllCategoriesResponse';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private API_URL = environment.API_URL;
  private JWT_TOKEN = this.cookie.get('USER_INFO');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`,
    }),
  };

  constructor(private http: HttpClient, private cookie: CookieService) {}

  getAllCategories(): Observable<Array<GetAllCategoriesResponse>> {
    return this.http.get<Array<GetAllCategoriesResponse>>(
      `${this.API_URL}/categories`,
      this.httpOptions
    );
  }

  deleteCategory(product_id: string): Observable<DeleteCategoryResponse> {
    return this.http.delete<DeleteCategoryResponse>(
      `${this.API_URL}/category/delete`,
      {
        ...this.httpOptions,
        params: { product_id: product_id },
      }
    );
  }
}
