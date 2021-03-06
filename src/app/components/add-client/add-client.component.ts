import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Client } from "../../models/Client";
import { firestore } from "firebase";
import { FlashMessagesService } from "angular2-flash-messages";
import { ClientService } from "../../services/client.service";

@Component({
  selector: "app-add-client",
  templateUrl: "./add-client.component.html",
  styleUrls: ["./add-client.component.sass"]
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: 0
  };

  disableBalanceOnAdd: boolean = false;
  @ViewChild("clientForm") form: any;
  submitted: boolean = false;

  constructor(
    private flashMessage: FlashMessagesService,
    private clientService: ClientService,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit({ value, valid }: { value: Client; valid: boolean }) {
    this.submitted = true;
    console.log(this.form);
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }
    if (!valid) {
      this.flashMessage.show("Please fill out the form correctly", {
        cssClass: "alert-danger",
        timeout: 4000
      });
    } else {
      this.flashMessage.show("Client added", {
        cssClass: "alert-success",
        timeout: 4000
      });
      this.clientService.newClient(value);
      this.router.navigate(['/']);
    }
  }
} // end of component
