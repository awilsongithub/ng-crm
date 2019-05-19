import { Component, OnInit, ViewChild } from "@angular/core";
import { Settings } from "../../models/Settings";
import { SettingsService } from "../../services/settings.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.sass"]
})
export class SettingsComponent implements OnInit {
  settings: Settings;
  formattedString: string;

  constructor(
    private settingsService: SettingsService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.settings = this.settingsService.getSettings();
  }

  onSubmit() {
    console.log(this.settings);
    this.settingsService.updateSettings(this.settings);
    this.flashMessage.show("settings saved", {
      cssClass: "alert-success",
      timeout: 4000
    });
  }

}
