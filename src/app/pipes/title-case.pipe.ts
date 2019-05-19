import { Pipe, PipeTransform } from "@angular/core";

/**
 * TITLECASEPIPE
 * receives unformatted string from user input
 * lower case all letters
 * capitalizes the first word and
 * all words except those in list
 */

@Pipe({
  name: "titleCase"
})
export class TitleCasePipe implements PipeTransform {
  prepositions = [
    "of",
    "the",
    "an",
    "a",
    "for",
    "and",
    "nor",
    "but",
    "yet",
    "so",
    "at",
    "around",
    "by",
    "after",
    "along",
    "for",
    "from",
    "on",
    "to",
    "with",
    "without"
  ];

  transform(value: any, args?: any): any {
    if (!value) {
      return null;
    }
    let arr = value.split(" ");
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].toLowerCase();
      if (i === 0 || !this.prepositions.includes(arr[i])) {
        let cap = arr[i].charAt(0).toUpperCase();
        let rest = arr[i].slice(1);
        arr[i] = cap + rest;
      }
    }
    return arr.join(" ");
  }
}
