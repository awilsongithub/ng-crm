import { Component, OnInit } from "@angular/core";
import { ClientService } from "../../services/client.service";
import { Client } from "../../models/Client";
import { Subscriber } from "rxjs";

@Component({
  selector: "app-clients",
  templateUrl: "./clients.component.html",
  styleUrls: ["./clients.component.sass"]
})
export class ClientsComponent implements OnInit {
  clients: Client[];
  totalOwed: number;

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.clientService.getClients().subscribe(clients => {
      console.log(clients);
      this.clients = clients;
      this.getTotalOwed();
    });
    
  }

  getTotalOwed() {
    console.log(this.clients);
    this.totalOwed = this.clients.reduce( (total:number, client:Client) => {   
        console.log(client.email, client.firstName, typeof client.balance)
        return total + client.balance;
    }, 0);
  }

}
