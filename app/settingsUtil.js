import { inbox } from "file-transfer";
import { readFileSync } from "fs";
import * as cbor from 'cbor';
import document from 'document';

let defaultSettings = {
  timerValue: "60",
  wallpaper: "blue.png"
};

let blueWallpaper = document.getElementById("blueWallpaper");
let blackWallpaper = document.getElementById("blackWallpaper");
let redWallpaper = document.getElementById("redWallpaper");

export let settings = defaultSettings;
inbox.onnewfile = processInbox;

export const loadSettings = () => {
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

  blueWallpaper.style.visibility = "hidden";
  blackWallpaper.style.visibility = "hidden";
  redWallpaper.style.visibility = "hidden";

let wallpaperNum = settings.wallpaperValue.selected;
if (wallpaperNum == 0){
  blueWallpaper.style.visibility = "visible";
} else if (wallpaperNum == 1){
  blackWallpaper.style.visibility = "visible";
} else if (wallpaperNum == 2)
redWallpaper.style.visibility = "visible";
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

function processInbox() {
  let fileName;
  while (fileName = inbox.nextFile()) {
    console.log("File received: " + fileName);
    if (fileName === 'settings.cbor') {
        loadSettings();
    }
  }
};
