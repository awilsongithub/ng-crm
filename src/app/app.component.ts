import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'clientpanel';

  onNavbarChange(isLoggedIn) {
      console.log('navbar change event', isLoggedIn)
  }
}
