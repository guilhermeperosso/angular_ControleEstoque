import { signupUserRequest } from './../../models/interfaces/user/signupUserRequest';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { authRequest } from 'src/app/models/interfaces/user/auth/authRequest';
import { authResponse } from 'src/app/models/interfaces/user/auth/authRespose';
import { signupUserResponse } from 'src/app/models/interfaces/user/signupUserResponse';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = environment.API_URL;

  constructor(private http: HttpClient, private cookie: CookieService) { }

  signupUser(requestDatas: signupUserRequest): Observable<signupUserResponse> {
    return this.http.post<signupUserResponse>(`${this.API_URL}/user`, requestDatas);
  }

  authUser(requestDatas: authRequest): Observable<authResponse> {
    return this.http.post<authResponse>(`${this.API_URL}/auth`, requestDatas)
  }

  isLoggedIn(): boolean{
    const JWT_TOKEN = this.cookie.get('USER_INFO');
    return JWT_TOKEN ? true : false;
  }
}
