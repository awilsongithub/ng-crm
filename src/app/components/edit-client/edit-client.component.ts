import { Component, OnInit, ViewChild } from "@angular/core";
import { ClientService } from "../../services/client.service";
import { Client } from "../../models/Client";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-edit-client",
  templateUrl: "./edit-client.component.html",
  styleUrls: ["./edit-client.component.sass"]
})
export class EditClientComponent implements OnInit {
  id: string;
  // init to empty strings while waiting for value
  client: Client = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: 0
  };
  @ViewChild("clientForm") form: any;

  constructor(
    private clientService: ClientService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    this.clientService.getClient(this.id).subscribe((client) => {
      this.client = client;
    });
  }

  onSubmit({ value, valid }: { value: Client; valid: boolean }) {
    if (!valid) {
      this.flashMessage.show("Please fill form correctly", {
        cssClass: "alert-danger",
        timeout: 4000
      });
    } else {
      // Add id to value and update
      value.id = this.client.id;
      this.clientService.updateClient(value);
      this.flashMessage.show("Client updated", {
        cssClass: "alert-success",
        timeout: 4000
      });
      this.router.navigate([`/client/${this.client.id}`]);
    }
  }
}
