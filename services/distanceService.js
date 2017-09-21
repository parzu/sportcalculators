import * as consts from './unitConstants.js';


export function distanceToMeters(distance, distType) {
    let multiple = 1;
    switch (parseInt(distType)) {
        case consts.distanceTypes.FEET: multiple=consts.feetToMeter; break;
        case consts.distanceTypes.KM: multiple=consts.kmToMeter; break;
        case consts.distanceTypes.MILE: multiple=consts.mileToMeter; break;
        default: multiple=1; break;
    }
    return parseFloat(distance) * multiple;
}