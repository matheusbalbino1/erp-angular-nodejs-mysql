import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalCreateUserComponent } from 'src/app/components/modal-create-user/modal-create-user.component';
import { User } from 'src/app/interfaces/IUser';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass'],
})
export class UserComponent {
  loading = false;
  data: User[] = [];
  displayedColumns: string[] = ['id', 'username', 'password'];

  constructor(private userService: UserService, public dialog: MatDialog) {}
  ngOnInit() {
    this.loading = true;
    this.userService.getAll().subscribe((data) => {
      this.data = data.message;
      this.loading = false;
    });
  }

  openModalCreateUser() {
    const modalRef = this.dialog.open(ModalCreateUserComponent, {
      width: '500px',
    });

    modalRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loading = true;
        this.userService.getAll().subscribe((data) => {
          this.data = data.message;
          this.loading = false;
        });
      }
    });
  }
}
