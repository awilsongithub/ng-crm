import { Component, OnInit, Input } from "@angular/core";
import { ClientService } from "../../services/client.service";
import { Client } from "../../models/Client";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-like",
  templateUrl: "./like.component.html",
  styleUrls: ["./like.component.sass"]
})
export class LikeComponent implements OnInit {
  isLiked: boolean = false;
  currUser: string;
  @Input("client") client: Client;

  constructor(
    private clientService: ClientService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.setLikeStatus();
  }

  private setLikeStatus() {
    this.authService.getCurrentUser().subscribe((res) => {
      console.log("current user:", res.uid);
      if (res && res.uid) {
        this.currUser = res.uid;
        if (this.client.likes.includes(this.currUser)) {
          this.isLiked = true;
        }
      }
    });
  }

  onClick() {
    if (this.isLiked) {
      let index = this.client.likes.indexOf(this.currUser);
      if (index != -1) {
        this.client.likes.splice(index, 1);
        this.isLiked = false;
      }
    } else {
      this.client.likes.push(this.currUser);
      this.isLiked = true;
    }
    this.clientService.updateClient(this.client);
  }
}
