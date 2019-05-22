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
          cb({rate: hrm.heartRate})
        });
     } else {
        console.log("This device does NOT have a HeartRateSensor!");
     }

     display.addEventListener('change', () => {
        if(display.on){
           console.log('display is on')
           bodyPresence.present ? hrm.start() : hrm.stop();
        }else{
            console.log('display is off');
            hrm.stop();
        }
     })

     if(BodyPresenceSensor && me.permissions.granted('access_activity')){
        bodyPresence = new BodyPresenceSensor();
        bodyPresence.addEventListener('reading', () => {
            bodyPresence.present ? hrm.start() : hrm.stop();
            if(bodyPresence.present){
               if(display.on){
                  hrm.start();
               }else{
                  hrm.stop();
               }
            }else{
               hrm.stop();
            }
        })
        bodyPresence.start();
     }

}
