import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalCreateUserComponent } from 'src/app/components/modal-create-user/modal-create-user.component';
import { ModalEditUserComponent } from 'src/app/components/modal-edit-user/modal-edit-user.component';
import { User } from 'src/app/interfaces/IUser';
import { UserService } from 'src/app/services/user.service';

export interface IUserTable extends User {
  action: 'delete' | 'edit';
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass'],
})
export class UserComponent {
  loading = false;
  data: IUserTable[] = [];
  displayedColumns: string[] = ['id', 'username', 'password', 'action'];

  constructor(private userService: UserService, public dialog: MatDialog) {}
  ngOnInit() {
    this.getAllUsers();
  }

  openModalCreateUser() {
    const modalRef = this.dialog.open(ModalCreateUserComponent, {
      width: '500px',
    });

    modalRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllUsers();
      }
    });
  }

  openModalEditUser(user: IUserTable) {
    const modalRef = this.dialog.open(ModalEditUserComponent, {
      width: '500px',
    });
    modalRef.componentInstance.setUser(user);
    modalRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllUsers();
      }
    });
  }

  private getAllUsers() {
    this.loading = true;
    this.userService.getAll().subscribe(async (data) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.data = data.message.map((user) => ({ ...user, action: 'edit' }));
      this.loading = false;
    });
  }
}
