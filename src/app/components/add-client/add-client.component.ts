import { Component, OnInit } from '@angular/core';
import { Client } from "../../models/Client";

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.sass']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: 0
  };

  // can't add balance when creating new client
  disableBalanceOnAdd: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
