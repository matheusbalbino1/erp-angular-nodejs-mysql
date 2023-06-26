import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.sass'],
})
export class HeaderNavComponent {
  username = 'username';
  user_id = '';

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userService.setUserId();
    this.user_id = this.userService.userId;
    this.userService.getUserById(this.user_id).subscribe(({ message }) => {
      this.username = message.username;
    });
  }

  logout() {
    this.authService.logout();
  }
}
