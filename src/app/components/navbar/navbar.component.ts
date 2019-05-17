import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { SettingsService } from "../../services/settings.service";
import { Client } from "../../models/Client";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.sass"]
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  loggedInUser: string;
  showRegister: boolean;
  @Output() change = new EventEmitter();

  constructor(
    private flashMessage: FlashMessagesService,
    private router: Router,
    private authService: AuthService,
    private settingsService: SettingsService
  ) {}

  ngOnInit() {
    this.authService.getAuth().subscribe((auth) => {
      if (auth) {
          console.log(auth)
        this.isLoggedIn = true;
        this.showRegister = false;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });

    this.showRegister = this.settingsService.getSettings().allowRegistration;
  }

  onLogoutClick() {
    this.change.emit(this);
    this.authService.logout();
    this.flashMessage.show("You are now logged out", {
      cssClass: "alert-succes",
      timeout: 4000
    });
    this.router.navigate(["/register"]);
  }
}
