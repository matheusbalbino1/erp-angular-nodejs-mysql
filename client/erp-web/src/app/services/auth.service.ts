import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAuthUser } from '../interfaces/IUser';
import { Observable } from 'rxjs';
import { IResponse } from '../interfaces/IResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public authenticate(dataUser: IAuthUser): Observable<IResponse> {
    return this.http.post<IResponse>('api/auth/login', dataUser);
  }
}
