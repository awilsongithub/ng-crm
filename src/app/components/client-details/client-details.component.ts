import { Component, OnInit } from "@angular/core";
import { ClientService } from "../../services/client.service";
import { Client } from "../../models/Client";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-client-details",
  templateUrl: "./client-details.component.html",
  styleUrls: ["./client-details.component.sass"]
})
export class ClientDetailsComponent implements OnInit {
  client: Client;
  id: string;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;
  likesCount: number = 44;

  constructor(
    private flashMessage: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute,
    private clientService: ClientService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    this.clientService.getClient(this.id).subscribe((client) => {
      if (client != null) {
        if (client.balance > 0) {
          this.hasBalance = true;
        }
      }
      this.client = client;
      console.log('client details are', this.client)
    });
  }

  updateBalance() {
    this.clientService.updateClient(this.client);
    this.flashMessage.show("Balance updated", {
      cssClass: "alert-success",
      timeout: 4000
    });
    this.showBalanceUpdateInput = false;
  }

  onDeleteClick() {
    if (confirm("are you sure")) {
      this.clientService.deleteClient(this.client);
      this.flashMessage.show("Client deleted", {
        cssClass: "alert-success",
        timeout: 4000
      });
      this.router.navigate(["/"]);
    }
  }
}
