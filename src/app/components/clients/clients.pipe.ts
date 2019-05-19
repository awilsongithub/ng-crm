import { Pipe, PipeTransform } from "@angular/core";
import { Client } from "../../models/Client";

@Pipe({ name: "hasBalance" })
export class ClientHasBalancePipe implements PipeTransform {
  transform(allClients: Client[], minBalance) {
    if (!minBalance) {
      minBalance = 0;
    }
    return allClients.filter((c) => c.balance >= minBalance);
  }
}

@Pipe({ name: "onlyAdam" })
export class onlyAdamPipe implements PipeTransform {
  transform(allClients: Client[], activated) {
    if (activated === true) {
      return allClients.filter((c) => c.firstName === "Adam");
    } else {
      return allClients;
    }
  }
}
