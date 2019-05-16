import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-like",
  templateUrl: "./like.component.html",
  styleUrls: ["./like.component.sass"]
})
export class LikeComponent implements OnInit {
  isLiked: boolean = false;
  @Input() likesCount: number;

  constructor() {}

  ngOnInit() {
      console.log(this.likesCount)
  }

  onClick() {
      this.isLiked = !this.isLiked;
      this.isLiked ? this.likesCount++ : this.likesCount--; 

  }
}
