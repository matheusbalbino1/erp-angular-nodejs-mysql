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
import { BACKEND_NODE } from '../enviroments/enviroments';

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
    return this.http.get<IGetUser>(`${BACKEND_NODE}/user/${id}`);
  }
  getAll() {
    return this.http.get<IGetUsers>(`${BACKEND_NODE}/user`);
  }

  create(dataUser: ICreateUser) {
    return this.http.post<IResponseCreateUser>(
      `${BACKEND_NODE}/user`,
      dataUser
    );
  }

  update(id: number, dataUser: ICreateUser) {
    return this.http.put<IResponseCreateUser>(`${BACKEND_NODE}/user/${id}`, {
      ...dataUser,
    });
  }

  delete(id: number) {
    return this.http.delete<IResponseCreateUser>(`${BACKEND_NODE}/user/${id}`);
  }
}
