import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modal-create-user',
  templateUrl: './modal-create-user.component.html',
  styleUrls: ['./modal-create-user.component.sass'],
})
export class ModalCreateUserComponent {
  loading = false;
  formGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<ModalCreateUserComponent>,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {}

  dispatchSnackBar(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  submit() {
    if (this.formGroup.invalid) {
      this.dispatchSnackBar('Preencha todos os campos');
      return;
    }
    this.loading = true;
    this.userService
      .create({
        password: this.formGroup.get('password')?.value as string,
        username: this.formGroup.get('username')?.value as string,
      })
      .subscribe(async ({ message }) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        this.dialogRef.close(true);
        this.dispatchSnackBar(
          `Usuário ${message.username}#${message.id} criado com sucesso!`
        );
        this.loading = false;
      });
  }
}
