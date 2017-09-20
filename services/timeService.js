import * as consts from './unitConstants.js';

// Each function does conversion and formating

export function timeToSeconds (hours, mins, secs) {
    return parseInt(hours, 10) * 3600 + parseInt(mins, 10) * 60 + parseInt(secs, 10);
}

export function formatTime(secs) {
    let hours = parseInt(secs / 3600);
    secs = secs-(hours*3600);
    let mins = parseInt(secs/60);
    secs = parseInt(secs-(mins*60));
    if (mins < 10) {
        mins = '0'+mins.toPrecision(1);
    }
    if (secs < 10) {
        secs = '0'+secs.toPrecision(1);
    }

    return hours+':'+mins+':'+secs;
  }