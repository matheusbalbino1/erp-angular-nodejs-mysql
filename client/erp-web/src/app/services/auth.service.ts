import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAuthUser } from '../interfaces/IUser';
import { Observable } from 'rxjs';
import { IResponse } from '../interfaces/IResponse';
import { MatSnackBar } from '@angular/material/snack-bar';
import { mapErrors } from '../mapErrors';
import * as jose from 'jose';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { BACKEND_NODE } from '../enviroments/enviroments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwt_jose: typeof jose;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private cookieService: CookieService,
    private routerService: Router
  ) {
    this.jwt_jose = jose;
  }

  dispatchSnackBar(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  public authenticate(dataUser: IAuthUser): void {
    this.http
      .post<IResponse>(`${BACKEND_NODE}/auth/login`, dataUser)
      .subscribe({
        error: ({ error: { message } }) => {
          this.dispatchSnackBar(mapErrors(message || ''));
        },
        next: async ({ message }) => {
          const dataToken = this.jwt_jose.decodeJwt(message);
          const expirationDate = new Date(Number(dataToken?.exp) * 1000);
          this.cookieService.set('token', message, expirationDate);
          this.dispatchSnackBar('Token setado no cookie expira em 1 hora!');
          this.routerService.navigate(['/user']);
        },
      });
  }

  public logout(): void {
    this.cookieService.delete('token');
    this.routerService.navigate(['/login']);
    this.dispatchSnackBar('Deslogado e token do cookie deletado com sucesso!');
  }

  public isAuthenticated(): boolean {
    return this.cookieService.check('token');
  }
}
