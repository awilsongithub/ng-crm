import { Pipe, PipeTransform } from "@angular/core";
import { Client } from "../../models/Client";

@Pipe({ name: "hasBalance" })
export class ClientHasBalancePipe implements PipeTransform {
  transform(allClients: Client[], minBalance) {
    // if (!allClients) {
    //   return [];
    // }
    // if (!minBalance) {
    //   return allClients;
    // }
    console.log(minBalance)
    return allClients.filter((c) => c.balance >= minBalance);
  }
}
