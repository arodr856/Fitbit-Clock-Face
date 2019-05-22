import { today } from 'user-activity';
import { clock } from 'clock';
import { me } from 'appbit';

const cb;

export function initialize(callback){
    cb = callback;
    clock.granularity = 'seconds';
    clock.addEventListener('tick', handleTick);

}

function handleTick(){
    if(me.permissions.granted('access_activity')){
        const stats = getStats();
        cb(stats);
    }
}

function getStats(){
    const stats = {};
    stats.steps = today.adjusted.steps;
    stats.calories = today.local.calories;
    return stats;
}