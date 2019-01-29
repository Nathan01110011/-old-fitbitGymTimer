import * as buttons from "../common/buttons";
import document from "document";
import { loadSettings, settings } from "./settingsUtil";
import { vibration } from "haptics";

//export const loadSettings = () => {

export const timer = document.getElementById("timer");
const counter = document.getElementById("counter");
const reset = document.getElementById("resetText");
const start = document.getElementById("startText");
const circle = document.getElementById("circ");
const circleBack = document.getElementById("circBack");


reset.style.display = "none";
timer.text = 'Get Ready';
let counterCycle = 0;
counter.text = "Sets: "+counterCycle;
export const active = false;

export let btnBR = document.getElementById("btn-br");
export let btnTR = document.getElementById("btn-tr");

loadSettings();

export const btnBrAction = () => {

  console.log("Bottom RIGHT!");

  if (active == true){
    active = false;
    console.log("false");
    timer.text = "Start Set";
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
    btnTR.style.display = "inline";
    reset.style.display = "inline";
  }
}

export const btnTrAction = () => {
  console.log("Top RIGHT!");
  active = false;
  counterCycle = 0;
  counter.text = "Sets: "+counterCycle;
    timer.text = "Get Ready";
    circle.sweepAngle = 360;
    circle.style.display = "none";
    circleBack.style.display = "none";
    btnTR.style.display = "none";
    reset.style.display = "none";
}

export const test = () => {
  vibration.start("nudge-max");
  active = false;
  timer.text = "Start Set";
  circle.style.display = "none";
  circle.sweepAngle = 360;
  circleBack.style.display = "none";
}

export const test2 = () => {
  timer.text = timer.text - 1;
  circle.sweepAngle = (timer.text/(settings.timerValue))*360;
}