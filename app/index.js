import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import * as buttons from "../common/buttons";
import { vibration } from "haptics";
import { display } from "display";
import { inbox } from "file-transfer";
import { readFileSync } from "fs";
import * as cbor from 'cbor';

//Settings
let defaultSettings = {
  timerValue: "60"
};
let settings = defaultSettings;

inbox.onnewfile = processInbox;

function loadSettings()
{
  try {
    settings = readFileSync("settings.cbor", "cbor");
    transformSettings();
    mergeWithDefaultSettings();
  } catch (e) {
    console.log('No settings found, fresh install, applying default settings...');

    //apply default settings
    settings = defaultSettings;
  }

  console.log('Applying settings: ' + JSON.stringify(settings));
  applySettings();

}

function applySettings() {

}

function mergeWithDefaultSettings() {
  for (let key in defaultSettings) {
    if (!settings.hasOwnProperty(key)) {
      settings[key] = defaultSettings[key];
    }
  }
}

function transformSettings() {
  //change all settings you want in another format as sent by the companion here
  if (settings.timerValue) {
    settings.timerValue = settings.timerValue.values[0].name;
  }
}

function processInbox()
{
  let fileName;
  while (fileName = inbox.nextFile()) {
    console.log("File received: " + fileName);

    if (fileName === 'settings.cbor') {
        loadSettings();
    }
  }
};


//Keep display on
display.autoOff = false;

// Update the clock every second
clock.granularity = "seconds";



// Get a handle on the <text> element

const currentTimeStroke = document.getElementById("currentTimeStroke");
const currentTime = document.getElementById("currentTime");
const timer = document.getElementById("timer");
const counter = document.getElementById("counter");
const reset = document.getElementById("resetText");
const start = document.getElementById("startText");
const circle = document.getElementById("circ");
const circleBack = document.getElementById("circBack");
timer.text = 'Get Ready';
let counterCycle = 0;
counter.text = "Sets: "+counterCycle;
const active = false;


//Bottom right button Function
let btnBR = document.getElementById("btn-br");

btnBR.onactivate = function(evt) {
  console.log("Bottom RIGHT!");

  if (active == true){
    active = false;
    console.log("false");
    timer.text = "Get Ready";
    circle.sweepAngle = 360;
    circle.style.display = "none";
    circleBack.style.display = "none";

  } else {
    active = true;
    console.log("true");
    timer.text = settings.timerValue;
    counterCycle++;
    counter.text = "Sets: "+counterCycle;
    console.log("Counter Added, Count "+counterCycle)
    circle.style.display = "inline";
    circleBack.style.display = "inline";
  }

}

//Top Right Button
let btnTR = document.getElementById("btn-tr");

btnTR.onactivate = function(evt) {
  console.log("Top RIGHT!");
  active = false;
  counterCycle = 0;
  counter.text = "Sets: "+counterCycle;
    timer.text = "Get Ready";
    circle.sweepAngle = 360;
    circle.style.display = "none";
    circleBack.style.display = "none";
}

loadSettings();


// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
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
  //currentTimeStroke.text = currentTime.text.charAt(0);

  if (active == true && timer.text != '0') {
    timer.text = timer.text - 1;
    circle.sweepAngle = (timer.text/(settings.timerValue))*360;

console.log(circle.sweepAngle);

    if (timer.text == 0){

      vibration.start("nudge-max");
      active = false;
      timer.text = "Start Set";
      circle.style.display = "none";
      circle.sweepAngle = 360;
      circleBack.style.display = "none";
    }
  }


}
