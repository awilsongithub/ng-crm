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

  /**
   * receives unformatted string from user input
   * lower case all letters
   * capitalizes the first word and
   * all words except "the" and "of"
   * sets this.formattedString to the result
   */
  onInputChange(event) {
    let wordArray = event.target.value.split(" ");
    this.formattedString = wordArray
      .map((word: string, index) => {
        word = word.toLowerCase();

        if (index === 0) {
          word = this._capitalizeFirstLetter(word);
        }
        if (word != "the" && word != "of") {
          word = this._capitalizeFirstLetter(word);
        }
        return word;
      })
      .join(" ");
  }

  private _capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  /**
   * input words show as Title Case
   * ngModel to render them as we type
   * onChange could format ngModel so
   *
   * all lowercase but first letter uppercase
   * unless word is x,y or z or
   * first word of phrase
   *
   * ltr by ltr? or word by word?
   * regex for of, the, ?
   *
   * Rise of the Planet of the Apes
   */
}
