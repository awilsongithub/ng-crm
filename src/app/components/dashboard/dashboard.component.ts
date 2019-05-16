import { Component, OnInit } from "@angular/core";
import { ClientService } from "../../services/client.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.sass"]
})
export class DashboardComponent implements OnInit {
  testInput: string = "New";

  constructor(private clientService: ClientService) {}

  ngOnInit() {}
}
