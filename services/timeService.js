import * as consts from './unitConstants.js';

// Each function does conversion and formating

export function timeToSeconds (hours, mins, secs) {
    return parseInt(hours, 10) * 3600 + parseInt(mins, 10) * 60 + parseInt(secs, 10);
}

export function formatTime(secs, format) {
    console.log(secs);
    let hours = parseInt(secs / 3600);
    secs = secs-(hours*3600);
    let mins = parseInt(secs/60);
    let sec = parseInt(secs-(mins*60));
    let ms = parseInt((secs-sec)*100);    
    console.log(ms);
    if (mins < 10) {
        mins = '0'+mins.toPrecision(1);
    }
    if (sec < 10) {
        sec = '0'+sec.toPrecision(1);
    }
    if (ms < 10) {
        ms = '0'+ms.toPrecision(1);
    } else {
        ms = ms.toFixed(2);
    }

    let result = hours+':'+mins+':'+secs;
    if (format == 'mm:ss.ms') {
        result = mins+':'+sec+'.'+ms;
    } 

    return result;
  }