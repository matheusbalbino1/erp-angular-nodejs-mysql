import { Component } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IAuthUser } from 'src/app/interfaces/IUser';
import { mapErrors } from 'src/app/mapErrors';
import { AuthService } from 'src/app/services/auth.service';
import * as jose from 'jose';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent {
  formGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  jwt_jose: typeof jose;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private cookieService: CookieService
  ) {
    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.jwt_jose = jose;
  }

  dispatchSnackBar(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  handleSubmit() {
    if (this.formGroup.invalid) {
      this.dispatchSnackBar('Preencha todos os campos');
      return;
    }

    this.authService.authenticate(this.formGroup.value as IAuthUser).subscribe({
      error: ({ error: { message } }) => {
        this.dispatchSnackBar(mapErrors(message || ''));
      },
      next: async ({ message }) => {
        const dataToken = await this.jwt_jose.decodeJwt(message);
        const expirationDate = new Date(Number(dataToken?.exp) * 1000);
        this.cookieService.set('token', message, expirationDate);
        this.dispatchSnackBar('Login realizado com sucesso!');
        this.dispatchSnackBar('Token salvo no cookie!');
      },
    });
  }
}
