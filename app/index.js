import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import * as buttons from "../common/buttons";
import { display } from "display";
import * as buttonsUtil from "./buttonsUtil";


//Keep display on
display.autoOff = false;

// Update the clock every second
clock.granularity = "seconds";

// Get a handle on the <text> element

const currentTime = document.getElementById("currentTime");

buttonsUtil.btnTR.style.display = "none";

//Bottom right button Function

buttonsUtil.btnBR.onactivate = function(evt) {

buttonsUtil.btnBrAction();
}

buttonsUtil.btnTR.onactivate = function(evt) {

  buttonsUtil.btnTrAction();
}



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

  if (buttonsUtil.active == true && buttonsUtil.timer.text != '0') {

    buttonsUtil.test2();


    if (buttonsUtil.timer.text == 0){

buttonsUtil.test();

    }
  }


}
