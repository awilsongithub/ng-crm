import { Component, OnInit, ViewChild } from "@angular/core";
import { ClientService } from "../../services/client.service";
import { Client } from "../../models/Client";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

/**
routerLink="client/edit/{{ client.id }}"
{ path: "client/edit/:id", component: EditClientComponent },
get client from current client 
we'll be incontext of client detail
current client will populate form 
reuse add form? refactor form to client-form.component?
*/

@Component({
  selector: "app-edit-client",
  templateUrl: "./edit-client.component.html",
  styleUrls: ["./edit-client.component.sass"]
})
export class EditClientComponent implements OnInit {
  // init to empty strings while waiting for value
  client: Client = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: 0
  };
  id: string;
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
      console.log(this.client);
    });
  }

  onSubmit(form) {
    this.clientService.updateClient(this.client);
    this.flashMessage.show("Client updated", {
      cssClass: "alert-success",
      timeout: 4000
    });
     this.router.navigate([`/client/${this.client.id}`]);
  }
}
