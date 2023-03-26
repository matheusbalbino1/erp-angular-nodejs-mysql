import { Injectable } from '@angular/core';
import { ICreateUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  create(dataUser: ICreateUser) {}
}
