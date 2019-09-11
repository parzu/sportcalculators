import * as consts from './unitConstants.js';


export function calculateSpeed(time, distance) {
    let speed = 0;
    if (time > 0 && distance > 0) {
        speed =  distance / time;
    } 
    return speed;
}

export function paceToSpeed(pace, unit) {
    let speed = 0;
    switch (unit) {
        case consts.paceTypes.MIN_KM:
            speed = consts.minkmToMps / pace;
            break;
        case consts.paceTypes.KM_H:
            speed = pace * consts.kmhToMps;
            break;
        case consts.paceTypes.MIN_MI:
            speed = consts.minmiToMps / pace;
            break;
        case consts.paceTypes.MPH:
            speed = pace * consts.mphToMps;
            break;
        default:
            break;
    }
    return speed;
}

// Each function does conversion and formating

export function mps (mps) {
    return mps.toFixed(2);
}

export function mpsToMph(mps) {
    return (mps * consts.mpsToMph).toFixed(2);
}

export function mpsToKmh(mps) {
    return (mps * consts.mpsToKmh).toFixed(2);
}

export function mpsToKmPace(mps) {
    return (consts.mpsToKmPace / mps).toFixed(2);
}

export function mpsToMilePace(mps) {
    return (consts.mpsToMilePace / mps).toFixed(2);
}

export function mpsToFps(mps) {
    return (mps * consts.mpsToFps).toFixed(2);
}