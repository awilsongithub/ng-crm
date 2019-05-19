import { Pipe, PipeTransform } from "@angular/core";
import { Client } from "../../models/Client";

/** 
 * minBalance inits at 0
 * user can change it 
 */
@Pipe({ name: "hasBalance" })
export class ClientHasBalancePipe implements PipeTransform {
  transform(allClients: Client[], minBalance?: number) {
    if (!minBalance) {
      minBalance = 0;
    }
    return allClients.filter((c) => c.balance >= minBalance);
  }
}

/**
 * filters when activated is true
 * true if user checks a box 
 */
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


/**
 * star full or empty on click
 * class based on property
 * click > prop = !prop
 * 
 * 
 */