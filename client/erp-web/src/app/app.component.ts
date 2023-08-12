import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  public title = 'erp-web';
  public showHeader = false;
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (!['/login', '/register'].includes(event.url)) {
          this.showHeader = true;
        } else {
          this.showHeader = false;
        }
      }
    });
  }
}
