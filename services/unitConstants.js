
export const distanceTypes = Object.freeze({METER: 0, FEET: 1, KM: 2, MILE: 3});

// Kilometers
export const mpsToKmh = 3.6;
export const mpsToKmPace = 16.6667;
export const kmToMeter = 1000;

// Mile
export const mpsToMph = 2.23694;
export const mpsToMilePace = 26.8224;
export const mileToMeter = 1609.344;

// Feets
export const mpsToFps = 3.28084;
export const feetToMeter = 0.3048;

export const heptathlonConsts = {
    "hurdles": {
        "a": 9.23076,
        "b": 26.7,
        "c": 1.835
    },
    "highjump": {
        "a": 1.84523,
        "b": 75.0,
        "c": 1.348
    },
    "shotput": {
        "a": 56.0211,
        "b": 1.50,
        "c": 1.05
    },
    "run200m": {
        "a": 4.99087,
        "b": 42.5,
        "c": 1.81
    },
    "longjump": {
        "a": 0.188807,
        "b": 210,
        "c": 1.41
    },
    "javelin": {
        "a": 15.9803,
        "b": 3.80,
        "c": 1.04
    },
    "run800m": {
        "a": 0.11193,
        "b": 254,
        "c": 1.88
    }
};
