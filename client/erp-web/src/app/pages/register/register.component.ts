import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ICreateUser } from 'src/app/interfaces/IUser';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { mapErrors } from 'src/app/mapErrors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent {
  formGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
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

    this.userService.create(this.formGroup.value as ICreateUser).subscribe({
      complete: () => {
        this.dispatchSnackBar('Usuário criado com sucesso');
        this.router.navigate(['/login']);
      },
      error: ({ error: { message } }) => {
        this.dispatchSnackBar(mapErrors(message || ''));
      },
    });
  }
}
