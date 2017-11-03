import * as consts from './unitConstants.js';

export const heptathlonConsts = [
    {
        'order': 1,
        'name': '100m hurdles',
        'resultName': 'time',
        'resultUnit': 's',
        'eventType': 'track',
        'day': 'first',
        'decimals': 2,
        'a': 9.23076,
        'b': 26.7,
        'c': 1.835
    },
    {
        'order': 2,
        'name': 'High jump',
        'resultName': 'height',
        'resultUnit': 'cm',
        'eventType': 'field',
        'day': 'first',
        'decimals': 0,
        'a': 1.84523,
        'b': 75.0,
        'c': 1.348
    },
    {
        'order': 3,
        'name': 'Shot put',
        'resultName': 'distance',
        'resultUnit': 'm',
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
        'resultName': 'time',
        'resultUnit': 's',
        'eventType': 'track',
        'day': 'first',
        'decimals': 2,
        'a': 4.99087,
        'b': 42.5,
        'c': 1.81
    },
    {
        'name': 'longjump',
        'day': 'second',
        'a': 0.188807,
        'b': 210,
        'c': 1.41
    },
    {
        'name': 'javelin',
        'day': 'second',
        'a': 15.9803,
        'b': 3.80,
        'c': 1.04
    },
    {
        'name': 'run800m',
        'day': 'second',
        'a': 0.11193,
        'b': 254,
        'c': 1.88
    }
];

export function calculateHeptathlonPoints(heptathlon, index) {
    if (heptathlon.events[index].result == '') {
        heptathlon.events[index].points = '';
    } else {
        let consts = heptathlonConsts[index];
        if (consts.eventType == "track") {
            heptathlon.events[index].points = getTrackPoints(consts, heptathlon.events[index]);
        } else {
            heptathlon.events[index].points = getFieldPoints(consts, heptathlon.events[index]);
        }
    }
    heptathlon = calculateTotals(heptathlon, heptathlonConsts);
    console.log('All calculated:', heptathlon);
    return heptathlon;
}

export function calculateHeptathlonResult(heptathlon, index) {
    if (heptathlon.events[index].points == '') {
        heptathlon.events[index].result = '';
    } else {
        let consts = heptathlonConsts[index];
        if (consts.eventType == "track") {
            heptathlon.events[index].result = getTrackResult(consts, heptathlon.events[index]);
        } else {
            heptathlon.events[index].result = getFieldResult(consts, heptathlon.events[index]);
        }
    }
    heptathlon = calculateTotals(heptathlon, heptathlonConsts);
    console.log('All calculated:', heptathlon);
    return heptathlon;
}

function calculateTotals(competition, consts) {
    let firstDay = 0;
    let secondDay = 0;
    console.log('----calculating totals----');
    for (let i = 0; i < competition.events.length; i++) {
        console.log('event ', i, ' points: ', competition.events[i].points);
        if (competition.events[i].points != '') {
            if (consts[i].day == 'first') {
                console.log('incresed first day from ', firstDay, ' to ', firstDay+competition.events[i].points);
                firstDay = firstDay + parseInt(competition.events[i].points);
            } else {
                secondDay = secondDay + parseInt(competition.events[i].points);
            }
        }
    }
    competition.firstDayPoints = firstDay;
    competition.seconDayPoints = secondDay;
    competition.totalPoints = firstDay + secondDay;
    return competition;
}

function getTrackPoints(consts, event) {
    let points = '';
    if (event.manual == true) {
        let manualTime = parseFloat(event.result) + getManualTime(event);
        console.log('time: ', event.result, ', manual time for calc: ', manualTime);
        points = Math.floor(consts.a*(Math.pow(consts.b-manualTime, consts.c)));                    
    } else {
        points = Math.floor(consts.a*(Math.pow((consts.b-event.result), consts.c)));
    }
    console.log('TrackPoints result: ', points);
    if (isNaN(points)) {
        points = 0;
    }
    return points;
}

function getTrackResult(consts, event) {
    let result = '';
    result = -(Math.pow((event.points/consts.a), (1/consts.c))-consts.b).toFixed(event.decimals);
    if (event.manual == true) {
       result = result - getManualTime(event);
    } 
    console.log('TrackResult result: ', result);
    if (isNaN(result)) {
        result = 0;
    }
    return result;
}

function getFieldResult(consts, event) {
    let result = '';
    result = (Math.pow((event.points/consts.a), (1/consts.c))+consts.b).toFixed(event.decimals);
    if (isNaN(result)) {
        result = 0;
    }
    return result;
}

function getFieldPoints(consts, event) {
    let points = '';
    points = Math.floor(consts.a*(Math.pow((event.result-consts.b), consts.c)));
    console.log('FieldPoints result: ', points);
    if (isNaN(points)) {
        points = 0;
    }
    return points;
}

function getManualTime(event) {
    return 0.24; //for now, create logic later.
}