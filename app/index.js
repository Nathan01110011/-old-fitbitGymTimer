import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import * as buttons from "../common/buttons";
import { display } from "display";
import * as buttonsUtil from "./buttonsUtil";
import { settings } from "./settingsUtil";

//Display content
display.autoOff = false;
let displayTimer = 0;
let settingsCheck = parseInt(settings.timerValue);
let displayOffTime;
// Update the clock every second
clock.granularity = "seconds";

// Get a handle on the <text> element
const currentTime = document.getElementById("currentTime");

//Execution of buttons
buttonsUtil.btnPlay.onactivate = function(evt) {
  buttonsUtil.btnBottomRight();
  displayTimer = 0;
};

buttonsUtil.btnReset.onactivate = function(evt) {
  buttonsUtil.btnTopTight();
  displayTimer = 0;
};

buttonsUtil.btnSkip.onactivate = function(evt) {
  buttonsUtil.btnTopTight();
  displayTimer = 0;
};

buttonsUtil.btnPause.onactivate = function(evt) {
  buttonsUtil.btnBottomRight();
  displayTimer = 0;
};

// Update the <text> element every tick with the current time
clock.ontick = evt => {
  displayOffTime = settingsCheck + 10;
  displayTimer = displayTimer + 1;
  console.log(displayTimer);

  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  currentTime.text = `${hours}:${mins}`;

  if (buttonsUtil.active == true && buttonsUtil.timer.text != "0") {
    buttonsUtil.timerCountdown();

    if (buttonsUtil.timer.text == 0) {
      buttonsUtil.timerComplete();
    }
  }

  if (buttonsUtil.active == false) {
    if (settingsCheck != parseInt(settings.timerValue)) {
      displayTimer = 0;
      buttonsUtil.resetTimer();
      settingsCheck = parseInt(settings.timerValue);
    } else if (displayTimer >= displayOffTime) {
      displayTimer = 0;
      display.on = false;
    }
  }
};
