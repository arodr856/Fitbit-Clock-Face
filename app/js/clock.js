import clock from 'clock';

import { days, abbreviatedMonths } from './date-data';
const cb;

export function initialize(callback){
    cb = callback;
    clock.granularity = 'seconds';
    clock.addEventListener('tick', handleTickEvent);
}

function handleTickEvent(event){
    const currentTime = `${modHours(event.date.getHours())} : ${event.date.getMinutes() < 10?'0'+event.date.getMinutes():event.date.getMinutes()} : ${event.date.getSeconds() < 10?'0'+event.date.getSeconds():event.date.getSeconds()}`;
    const currentDate = `${abbreviatedMonths[event.date.getMonth()]} ${event.date.getDate()}`;
    const day = days[event.date.getDay()];
    cb({time: currentTime, date: currentDate, day});

}

const modHours = (hour) => {

    const moddedHour = hour % 12;
  
    if(moddedHour < 10){
      if(moddedHour === 0)
        return '12';
      return ('0' + moddedHour);
    }else{
      return moddedHour;
    }
  
  }