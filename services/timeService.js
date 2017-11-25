import * as consts from './unitConstants.js';

// Each function does conversion and formating

export function timeToSeconds (hours, mins, secs) {
    if (isNaN(hours) || hours == '') {
        hours = 0;
    }
    if (isNaN(mins) || mins == '') {
        mins = 0;
    }
    if (isNaN(secs) || secs == '') {
        secs = 0;
    }
    let totalSecs = parseInt((parseInt(hours) * 3600) + (parseInt(mins) * 60) + parseInt(secs));
    return totalSecs;   
}

export function formatTime(secs, format) {
    console.log(secs);
    let hours = parseInt(secs / 3600);
    secs = secs-(hours*3600);
    let mins = parseInt(secs/60);
    let sec = parseInt(secs-(mins*60));
    console.log('sec', sec);
    let ms = parseInt((secs-sec)*100);    
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
    console.log('sec', sec);
    let result = hours+':'+mins+':'+sec;
    if (format == 'mm:ss.ms') {
        result = mins+':'+sec+'.'+ms;
    } 
    console.log(result);
    return result;
  }