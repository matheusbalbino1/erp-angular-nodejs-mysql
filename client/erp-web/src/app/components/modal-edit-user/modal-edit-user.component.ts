import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUserTable } from 'src/app/pages/user/user.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modal-edit-user',
  templateUrl: './modal-edit-user.component.html',
  styleUrls: ['./modal-edit-user.component.sass'],
})
export class ModalEditUserComponent {
  public user: IUserTable = {} as IUserTable;
  public loading = false;
  public controls = {
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  };
  public formGroup = new FormGroup({
    username: this.controls.username,
    password: this.controls.password,
  });

  constructor(
    public dialogRef: MatDialogRef<ModalEditUserComponent>,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {}

  public submit() {
    if (this.formGroup.invalid) {
      this.dispatchSnackBar('Preencha todos os campos');
      return;
    }
    this.loading = true;
    this.userService
      .update(this.user.id, {
        password: this.formGroup.get('password')?.value as string,
        username: this.formGroup.get('username')?.value as string,
      })
      .subscribe(async ({ message }) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        this.dispatchSnackBar(
          `Usuário ${message.username}#${message.id} alterado com sucesso!`
        );
        this.loading = false;
        this.dialogRef.close(true);
      });
  }

  public deleteUser() {
    if (this.user.id === Number(this.userService.userId)) {
      this.dispatchSnackBar(`Não é possível deletar o usuário logado!`);
      return;
    }
    this.loading = true;
    this.userService.delete(this.user.id).subscribe(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      this.loading = false;
      this.dialogRef.close(true);
    });
  }

  public setUser(user: IUserTable) {
    this.user = user;
    this.controls.username.setValue(this.user.username);
    this.controls.password.setValue(this.user.password);
  }

  private dispatchSnackBar(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
