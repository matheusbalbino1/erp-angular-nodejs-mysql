import { Injectable } from '@angular/core';
import {
  ICreateUser,
  IGetUser,
  IGetUsers,
  IResponseCreateUser,
} from '../interfaces/IUser';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import * as jose from 'jose';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userId = '';
  jwt_jose: typeof jose;
  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.jwt_jose = jose;
  }

  setUserId() {
    const token = this.cookieService.get('token');
    if (token) {
      const dataToken = this.jwt_jose.decodeJwt(token);
      this.userId = dataToken['id'] as string;
    }
  }

  getUserById(id: string) {
    return this.http.get<IGetUser>(`api/user/${id}`, {
      headers: {
        Authorization: `Bearer ${this.cookieService.get('token')}`,
      },
    });
  }
  getAll() {
    return this.http.get<IGetUsers>('api/user', {
      headers: {
        Authorization: `Bearer ${this.cookieService.get('token')}`,
      },
    });
  }

  create(dataUser: ICreateUser) {
    return this.http.post<IResponseCreateUser>('api/user', dataUser);
  }
}
