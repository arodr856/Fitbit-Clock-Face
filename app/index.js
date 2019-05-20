import document from 'document';
import clock from 'clock';

const clockText = document.getElementById('time');
const dateText = document.getElementById('date');

// clock set up
clock.granularity = 'seconds';

clock.ontick = (event) => {
  const currentTime = `${event.date.getHours()}:${event.date.getMinutes()}:${event.date.getSeconds()}`;
  const currentDate = `${event.date.getMonth() + 1} / ${event.date.getDate()}`;
  dateText.text = currentDate;
  clockText.text = currentTime;
}