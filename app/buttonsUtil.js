import * as buttons from "../common/buttons";
import document from "document";
import { loadSettings, settings } from "./settingsUtil";
import { vibration } from "haptics";

//export const loadSettings = () => {
export let btnPlay = document.getElementById("btn-play");
export let btnReset = document.getElementById("btn-reset");
export let btnPause = document.getElementById("btn-pause");
export let btnSkip = document.getElementById("btn-skip");

export const timer = document.getElementById("timer");
export const active = false;

const counter = document.getElementById("counter");
const textTR = document.getElementById("textTR");
const textBR = document.getElementById("textBR");
const circle = document.getElementById("circ");
const circleBack = document.getElementById("circBack");


let counterCycle = 0;
textTR.style.display = "none";
timer.text = 'Get Ready';
counter.text = "Sets: "+counterCycle;
btnReset.style.display = "none";

loadSettings();
resetTimer();

export const btnBottomRight = () => {

  if (active == true){
    pauseTimer();

  } else {
    startTimer();
  }
}

export const btnTopTight = () => {

  if (active == false){
    resetTimer();
  } else {
    restFinish();
  }
}

export const timerComplete = () => {
  vibration.start("nudge-max");
  restFinish();
}

export const timerCountdown = () => {
  timer.text = timer.text - 1;

  circle.sweepAngle = (timer.text/(settings.timerValue))*360;

}

function startTimer() {

  buttonsPauseSkip();

  if (timer.text == "Get Ready" || timer.text == "Start Set") {

    active = true;
    timer.text = settings.timerValue;
    counterCycle++;
    counter.text = "Sets: "+counterCycle;
    circle.style.display = "inline";
    circleBack.style.display = "inline";

    buttonsPauseSkip();

  } else {
    active = true;
  }
}


function pauseTimer() {

  active = false;
  buttonsStartReset();
}

export function resetTimer() {
  active = false;
  counterCycle = 0;
  counter.text = "Sets: "+counterCycle;
  timer.text = "Get Ready";
  circle.sweepAngle = 360;
  circle.style.display = "none";
  circleBack.style.display = "none";
  timer.style.fill = "white";

  buttonsStartReset();

  console.log("Reset Triggered");

}

function buttonsStartReset() {

  textTR.style.display = "inline";
  textBR.text = "Start";
  textTR.text = "Reset";
  textTR.style.fill = "fb-red";
  btnPlay.style.display = "inline";
  btnReset.style.display = "inline";
  btnPause.style.display = "none";
  btnSkip.style.display = "none";
  circle.style.fill = "fb-extra-dark-gray";
  timer.style.fill = "fb-extra-dark-gray";

  if (timer.text == "Get Ready"){
    btnReset.style.display = "none";
    textTR.style.display = "none";
    timer.style.fill = "white";
  }

}

function buttonsPauseSkip() {


  textTR.style.display = "inline";
  textTR.text = "Skip";
  textTR.style.fill = "royalblue";
  textBR.text = "Pause";
  btnPlay.style.display = "none";
  btnReset.style.display = "none";
  btnSkip.style.display = "inline";
  btnPause.style.display = "inline";
  circle.style.fill = "royalblue";
  timer.style.fill = "white";

}

function restFinish() {

  buttonsStartReset();
  active = false;
  timer.text = "Start Set";
  circle.style.display = "none";
  circle.sweepAngle = 360;
  circleBack.style.display = "none";
  timer.style.fill = "white";
}
