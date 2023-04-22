import { Injectable } from '@angular/core';
import { ICreateUser, IResponseCreateUser } from '../interfaces/IUser';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  create(dataUser: ICreateUser) {
    return this.http.post<IResponseCreateUser>('api/user', dataUser);
  }
}
