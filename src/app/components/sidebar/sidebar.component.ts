import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.sass"]
})
export class SidebarComponent implements OnInit {
  @Input("testInput") inputNickname: string;
  constructor() {}

  ngOnInit() {}
}
