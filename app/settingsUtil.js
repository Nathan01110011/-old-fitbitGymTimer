import { inbox } from "file-transfer";
import { readFileSync } from "fs";
import * as cbor from 'cbor';
import document from 'document';

let defaultSettings = {
  timerValue: "60",
  backgroundColor: 1
};

let backgroundWallpaper = document.getElementById("backgroundColor");

export let settings = defaultSettings;
export let settingsChanged = false;
inbox.onnewfile = processInbox;

export const loadSettings = () => {

  try {

    settings = readFileSync("settings.cbor", "cbor");
    console.log("TEST : "+ JSON.stringify(settings));
    transformSettings();
    mergeWithDefaultSettings();

  } catch (e) {

    //apply default settings
    settings = defaultSettings;

    //settings.timerValue = tempTime;

  }
  console.log('Applying settings: ' + JSON.stringify(settings));
  applySettings();


}

function applySettings() {

  changeBackground();

}

function mergeWithDefaultSettings() {
  for (let key in defaultSettings) {
    if (!settings.hasOwnProperty(key)) {
      settings[key] = defaultSettings[key];
    }
  }
}

function transformSettings() {

console.log("Colour : "+ settings.backgroundColor);

console.log(JSON.stringify(settings));

if (settings.timerValue != null){
    settings.timerValue = settings.timerValue.values[0].name;
}
}

function processInbox() {
  let fileName;
  while (fileName = inbox.nextFile()) {
    console.log("File received: " + fileName);
    if (fileName === 'settings.cbor') {
      loadSettings();
    }
  }
}

function changeBackground() {

  if (settings.backgroundColor == 1) {
    backgroundWallpaper.gradient.colors.c1 = "#000000";
    backgroundWallpaper.gradient.colors.c2 = "#000000";
    backgroundWallpaper.gradient.colors.c3 = "#000000";
    backgroundWallpaper.gradient.colors.c4 = "#000000";
  } else if (settings.backgroundColor == 2) {
    backgroundWallpaper.gradient.colors.c1 = "#943126";
    backgroundWallpaper.gradient.colors.c2 = "#EC7063";
    backgroundWallpaper.gradient.colors.c3 = "#CB4335";
    backgroundWallpaper.gradient.colors.c4 = "#F5B7B1";
  } else if (settings.backgroundColor == 3) {
    backgroundWallpaper.gradient.colors.c1 = "#B7950B";
    backgroundWallpaper.gradient.colors.c2 = "#F7DC6F";
    backgroundWallpaper.gradient.colors.c3 = "#F1C40F";
    backgroundWallpaper.gradient.colors.c4 = "#F9E79F";
  } else if (settings.backgroundColor == 4) {
    backgroundWallpaper.gradient.colors.c1 = "#196F3D";
    backgroundWallpaper.gradient.colors.c2 = "#52BE80";
    backgroundWallpaper.gradient.colors.c3 = "#229954";
    backgroundWallpaper.gradient.colors.c4 = "#A9DFBF";
  } else if (settings.backgroundColor == 5) {
    backgroundWallpaper.gradient.colors.c1 = "#17A589";
    backgroundWallpaper.gradient.colors.c2 = "#76D7C4";
    backgroundWallpaper.gradient.colors.c3 = "#48C9B0";
    backgroundWallpaper.gradient.colors.c4 = "#A3E4D7";
  } else if (settings.backgroundColor == 6) {
    backgroundWallpaper.gradient.colors.c1 = "#1B4F72";
    backgroundWallpaper.gradient.colors.c2 = "#3498DB";
    backgroundWallpaper.gradient.colors.c3 = "#2874A6";
    backgroundWallpaper.gradient.colors.c4 = "#85C1E9";
  }

}
