import { Injectable } from "@angular/core";
import { Settings } from "../models/Settings";

@Injectable({
  providedIn: "root"
})
export class SettingsService {
  settings: Settings = {
    allowRegistration: true,
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: true
  };

  constructor() {
      // get from localStorge when we come to the page
    if (localStorage.getItem("settings") != null) {
      this.settings = JSON.parse(localStorage.getItem("settings"));
    }
  }

  getSettings(): Settings {
    return this.settings;
  }

  updateSettings(settings: Settings) {
    console.log(settings);
    // localStorage needs a string 
    localStorage.setItem("settings", JSON.stringify(settings));
  }
}
