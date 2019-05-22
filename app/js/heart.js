import { HeartRateSensor } from 'heart-rate';
import { BodyPresenceSensor } from 'body-presence';
import { me } from 'appbit';

const cb;
const hrm = null;
const bodyPresence = null;

export function initialize(callback){
    cb = callback;

    if (HeartRateSensor && me.permissions.granted('access_heart_rate')) {
        console.log("This device has a HeartRateSensor!");
        hrm = new HeartRateSensor();
        hrm.addEventListener("reading",() => {
          cb({rate: hrm.heartRate})
        });
     } else {
        console.log("This device does NOT have a HeartRateSensor!");
     }

     if(BodyPresenceSensor && me.permissions.granted('access_activity')){
        bodyPresence = new BodyPresenceSensor();
        bodyPresence.addEventListener('reading', () => {
            bodyPresence.present ? hrm.start() : hrm.stop();
        })
        bodyPresence.start();
     }
}
