import document from 'document';
import clock from 'clock';

import { days } from './js/date-data';

const clockText = document.getElementById('time');
const dateText = document.getElementById('date');
const dayText = document.getElementById('day');

// clock set up
clock.granularity = 'seconds';

clock.ontick = (event) => {
  const currentTime = `${modHours(event.date.getHours())}:${event.date.getMinutes()}:${event.date.getSeconds()}`;
  const currentDate = `${event.date.getMonth() + 1} / ${event.date.getDate()}`;
  dateText.text = currentDate;
  clockText.text = currentTime;
  dayText.text = days[event.date.getDay()];
}

const modHours = (hour) => {

  const moddedHour = hour % 12;

  if(moddedHour < 10){
    if(moddedHour === 0)
      return '01';
    return (0 + moddedHour);
  }else{
    return moddedHour;
  }

}