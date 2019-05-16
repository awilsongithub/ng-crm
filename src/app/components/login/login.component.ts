import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
 import { SettingsService } from "../../services/settings.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.sass"]
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  loginFailureAnimation: boolean = false;
  showRegister: boolean;

  constructor(
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private settingsService: SettingsService
  ) {}

  // TODO shouldn't we also do this here:
  // set authenticated state so we
  // show logout not login
  // dont show register
  // allow authorized ui to show
  // ...
  ngOnInit() {
    this.authService.getAuth().subscribe((auth) => {
      console.log(auth);
      if (auth) {
        this.router.navigate(["/"]);
      } else {
           this.showRegister = this.settingsService.getSettings().allowRegistration;

      }
    });

  }

  // use our nmModel bound values
  onSubmit() {
    console.log(this.email);
    this.authService
      .login(this.email, this.password)
      .then((res) => {
        console.log(res);
        this.flashMessage.show("Login successful", {
          cssClass: "alert-success",
          timeout: 4000
        });
        this.router.navigate(["/"]);
      })
      // firestore provides user friendly error messages
      .catch((err) => {
        this.flashMessage.show(err.message, {
          cssClass: "alert-danger",
          timeout: 4000
        });
        this.loginFailureAnimation = true;
        setTimeout(() => {
          this.loginFailureAnimation = false;
        }, 500);
      });
  }
}
