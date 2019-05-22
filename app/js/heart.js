import { HeartRateSensor } from 'heart-rate';
import { BodyPresenceSensor } from 'body-presence';
import { me } from 'appbit';
import { display } from 'display';

const cb;
const hrm = null;
const bodyPresence = null;

export function initialize(callback){
    cb = callback;

   if (HeartRateSensor && me.permissions.granted('access_heart_rate')) {
      console.log("This device has a HeartRateSensor!");
      hrm = new HeartRateSensor();
      hrm.addEventListener("reading",() => {
         cb({rate: hrm.heartRate, bodyPresent: bodyPresence.present})
      });
   } else {
      console.log("This device does NOT have a HeartRateSensor!");
   }

    if(BodyPresenceSensor && me.permissions.granted('access_activity')){
      bodyPresence = new BodyPresenceSensor();
      bodyPresence.addEventListener('reading', () => {
          if(bodyPresence.present){
             hrm.start();
          }else{
             hrm.stop();
             callback({rate: '- -', bodyPresent: bodyPresence.present});
          }
      })
      bodyPresence.start();
   }

   display.addEventListener('change', () => {
      if(display.on){
         bodyPresence.present ? hrm.start() : hrm.stop();
      }else{
          hrm.stop();
      }
   })


}
