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
  minBalance: number = 0;
  highBalance: number = 1000;
  onlyAdam: boolean = false;

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.clientService.getClients().subscribe((clients) => {
      this.clients = clients;
      this.getTotalOwed();
    });
  }

  // on checkbox change, toggle boolean 
  // pipe (filter) only filters if boolean is true 
  onlyAdamPipeToggle(event) {
      this.onlyAdam = event.target.checked;
      console.log(this.onlyAdam)
  }

  getTotalOwed() {
    this.totalOwed = this.clients.reduce((total: number, client: Client) => {
      return total + client.balance;
    }, 0);
  }

  checkBalance(balance) {
      console.log(balance)
      if(balance > this.highBalance){
          return true;
      } else {
          return false;
      }
  }
}
