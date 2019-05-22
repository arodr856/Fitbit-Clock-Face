import document from 'document';

import * as clockInitializer from './js/clock';
import * as heartBeatController from './js/heart';
import {today} from 'user-activity';

const clockText = document.getElementById('time');
const dateText = document.getElementById('date');
const dayText = document.getElementById('day');
const heartImg = document.getElementById('heartIcon');
const bpmText = document.getElementById('bpm');
let grow = true;



clockInitializer.initialize((data) => {
  clockText.text = data.time;
  dateText.text = data.date;
  dayText.text = data.day;
  heartBeat();
});

heartBeatController.initialize((data) => {
  bpmText.text = data.rate;
});


function heartBeat(){
  if(grow){
    heartImg.width = 30;
    heartImg.height = 30;
    heartImg.style.opacity = 1;
    grow = !grow;
  }else{
    heartImg.width = 24;
    heartImg.height = 24;
    heartImg.style.opacity = .7;
    grow = !grow;
  }
}



