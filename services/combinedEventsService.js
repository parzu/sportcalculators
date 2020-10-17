import * as consts from './unitConstants.js';
import {formatTime} from './timeService.js';


export const decathlonConsts = [
    {
        'name': '100m',
        'resultUnit': 's',
        'resultExample': 'eg. 11.85',
        'eventType': 'track',
        'day': 'first',
        'decimals': 2,
        'manualTime': 0.24,
        'a': 25.4347,
        'b': 18,
        'c': 1.81
    },
    {
        'name': 'Long jump',
        'resultUnit': 'cm',
        'resultExample': 'eg. 798',
        'eventType': 'field',
        'day': 'first',
        'decimals': 2,
        'a': 0.14354,
        'b': 220,
        'c': 1.4,
    },
    {
        'name': 'Shot put',
        'resultUnit': 'm',
        'resultExample': 'eg. 19.85',
        'eventType': 'field',
        'day': 'first',
        'decimals': 2,
        'a': 51.39,
        'b': 1.5,
        'c': 1.05
    },
    {
        'name': 'High jump',
        'resultUnit': 'cm',
        'resultExample': 'eg. 189',
        'eventType': 'field',
        'day': 'first',
        'decimals': 2,
        'a': 0.8465,
        'b': 75,
        'c': 1.42
    },
    {
        'name': '400m',
        'resultUnit': 's',
        'resultExample': 'eg. 44.85',
        'eventType': 'track',
        'day': 'first',
        'decimals': 2,
        'manualTime': 0.14,
        'a': 1.53775,
        'b': 82,
        'c': 1.81
    },
    {
        'name': '110m hurdles',
        'resultUnit': 's',
        'resultExample': 'eg. 13.85',
        'eventType': 'track',
        'day': 'second',
        'decimals': 2,
        'manualTime': 0.24,
        'a': 5.74352,
        'b': 28.5,
        'c': 1.92
    },
    {
        'name': 'Discus throw',
        'resultUnit': 'm',
        'resultExample': 'eg. 63.85',
        'eventType': 'field',
        'day': 'second',
        'decimals': 2,
        'a': 12.91,
        'b': 4,
        'c': 1.1
    },
    {
        'name': 'Pole vault',
        'resultUnit': 'cm',
        'resultExample': 'eg. 547',
        'eventType': 'field',
        'day': 'second',
        'decimals': 2,
        'a': 0.2797,
        'b': 100,
        'c': 1.35
    },
    {
        'name': 'Javelin throw',
        'resultUnit': 'm',
        'resultExample': 'eg. 76.85',
        'eventType': 'field',
        'day': 'second',
        'decimals': 2,
        'a': 10.14,
        'b': 7,
        'c': 1.08
    },
    {
        'name': '1500m',
        'resultUnit': 'm:ss',
        'resultExample': 'eg. 2:13.85',
        'eventType': 'track',
        'day': 'second',
        'decimals': 2,
        'a': 0.03768,
        'b': 480,
        'c': 1.85
    }
];


export const heptathlonConsts = [
    {
        'order': 1,
        'name': '100m hurdles',
        'resultUnit': 's',
        'resultExample': 'eg. 13.85',
        'eventType': 'track',
        'day': 'first',
        'decimals': 2,
        'manualTime': 0.24,
        'a': 9.23076,
        'b': 26.7,
        'c': 1.835
    },
    {
        'order': 2,
        'name': 'High jump',
        'resultUnit': 'cm',
        'resultExample': 'eg. 182',
        'eventType': 'field',
        'day': 'first',
        'decimals': 2,
        'a': 1.84523,
        'b': 75.0,
        'c': 1.348
    },
    {
        'order': 3,
        'name': 'Shot put',
        'resultUnit': 'm',
        'resultExample': 'eg. 17.06',
        'eventType': 'field',
        'day': 'first',
        'decimals': 2,
        'a': 56.0211,
        'b': 1.50,
        'c': 1.05
    },
    {
        'order': 4,
        'name': '200m',
        'resultUnit': 's',
        'resultExample': 'eg. 23.80',
        'eventType': 'track',
        'day': 'first',
        'decimals': 2,
        'manualTime': 0.24,
        'a': 4.99087,
        'b': 42.5,
        'c': 1.81
    },
    {
        'order': 5,
        'name': 'Long jump',
        'resultUnit': 'cm',
        'resultExample': 'eg. 647',
        'eventType': 'field',
        'day': 'second',
        'decimals': 2,
        'a': 0.188807,
        'b': 210,
        'c': 1.41
    },
    {
        'order': 6,
        'name': 'Javelin throw',
        'resultUnit': 'm',
        'resultExample': 'eg. 57.17',
        'eventType': 'field',
        'day': 'second',
        'decimals': 2,
        'a': 15.9803,
        'b': 3.80,
        'c': 1.04
    },
    {
        'order': 7,
        'name': '800m',
        'resultUnit': 'm:ss',
        'resultExample': 'eg. 2:07.64',
        'eventType': 'track',
        'day': 'second',
        'decimals': 2,
        'manualTime': 0,
        'a': 0.11193,
        'b': 254,
        'c': 1.88
    }
];

export function calculateCombinedEventsPoints(combinedEvents, index, combEvent) {
    let allConsts = heptathlonConsts;
    if (combEvent == 'decathlon') {
        allConsts = decathlonConsts;
    }
    let eventConsts = allConsts[index];

    if (combinedEvents.events[index].result == '') {
        combinedEvents.events[index].points = '';
    } else {
        
        if (eventConsts.eventType == "track") {
            combinedEvents.events[index].points = getTrackPoints(eventConsts, combinedEvents.events[index]);
        } else {
            combinedEvents.events[index].points = getFieldPoints(eventConsts, combinedEvents.events[index]);
        }
    }
    combinedEvents = calculateTotals(combinedEvents, allConsts);
    return combinedEvents;
}

export function calculateCombinedEventsResult(combindedEvents, index, combEvent) {
    let allConsts = heptathlonConsts;
    if (combEvent == 'decathlon') {
        allConsts = decathlonConsts;
    }
    let eventConsts = allConsts[index];

    if (combindedEvents.events[index].points == '') {
        combindedEvents.events[index].result = '';
    } else {
        if (eventConsts.eventType == "track") {
            combindedEvents.events[index].result = getTrackResult(eventConsts, combindedEvents.events[index]);
        } else {
            combindedEvents.events[index].result = getFieldResult(eventConsts, combindedEvents.events[index]);
        }
    }
    combindedEvents = calculateTotals(combindedEvents, allConsts);
    return combindedEvents;
}

function calculateTotals(competition, consts) {
    let firstDay = 0;
    let secondDay = 0;
    for (let i = 0; i < competition.events.length; i++) {
        if (competition.events[i].points != '') {
            if (consts[i].day == 'first') {
                firstDay = firstDay + parseInt(competition.events[i].points);
            } else {
                secondDay = secondDay + parseInt(competition.events[i].points);
            }
        }
    }
    competition.firstDayPoints = firstDay;
    competition.secondDayPoints = secondDay;
    competition.totalPoints = firstDay + secondDay;
    return competition;
}

function getTrackPoints(consts, event) {
    let points = '';
    let time = event.result;

    if (isNaN(event.result)) {
        time = parseTime(event.result);
    }
    if (event.manual == true) {
        let manualTime = parseFloat(time) + consts.manualTime;
        points = Math.floor(consts.a*(Math.pow(consts.b-manualTime, consts.c)));                    
    } else {
        points = Math.floor(consts.a*(Math.pow((consts.b-time), consts.c)));
    }
    if (isNaN(points)) {
        points = 0;
    }
    return points;
}

function getTrackResult(consts, event) {
    let result = '';
    result = -(Math.pow((event.points/consts.a), (1/consts.c))-consts.b);
    if (event.manual == true) {
       result = result - consts.manualTime;
    } 
    if (isNaN(result)) {
        result = 0;
    }
    if (result >= 60) {
        let min = parseInt(result/60);
        let sec = parseInt(result-min*60)
        let ms = ((result-(min*60)-sec)*100).toFixed();
        if (sec < 10) {
            sec = '0'+sec.toPrecision(1);
        }
        if (ms < 10 ) {
            ms = '0'+ms;   
        }
        result = min+':'+sec+'.'+ms;
    } else {
        result = result.toFixed(consts.decimals);
    }
    return result;
}

function getFieldResult(consts, event) {
    let result = '';
    result = (Math.pow((event.points/consts.a), (1/consts.c))+consts.b).toFixed(consts.decimals);
    if (isNaN(result)) {
        result = 0;
    }
    return result;
}

function getFieldPoints(consts, event) {
    let points = '';
    points = Math.floor(consts.a*(Math.pow((event.result-consts.b), consts.c)));
    if (isNaN(points)) {
        points = 0;
    }
    return points;
}

function parseTime(time) {
    let result = 0;
    let ind = time.indexOf(':');
    let mins = parseInt(time.substr(0, ind));
    let secs = parseFloat(time.substr(ind+1, time.length));
    return parseFloat(mins*60+secs);
}