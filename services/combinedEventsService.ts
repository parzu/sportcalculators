import { formatTime } from './timeService';

// TS: 'interface' defines the shape of an object. Think of it as a type blueprint.
export interface EventConsts {
  name: string;
  resultUnit: string;
  resultExample: string;
  eventType: 'track' | 'field'; // TS: union type — only 'track' or 'field' are valid strings
  day: 'first' | 'second';
  decimals: number;
  manualTime?: number; // TS: the '?' makes this property optional
  order?: number;
  a: number;
  b: number;
  c: number;
}

// TS: A single event's current state (result entered by user, computed points, timing flag)
export interface CombinedEvent {
  result: string | number; // TS: can be a numeric string like "10.83" or a number
  points: string | number;
  manual?: boolean;
}

// TS: The full competition state object
export interface CombinedEventsCompetition {
  events: CombinedEvent[]; // TS: CombinedEvent[] means 'array of CombinedEvent'
  firstDayPoints: number | string;
  secondDayPoints: number | string;
  totalPoints: number | string;
}

export const decathlonConsts: EventConsts[] = [
  { name: '100m',          resultUnit: 's',     resultExample: 'eg. 11.85', eventType: 'track', day: 'first',  decimals: 2, manualTime: 0.24, a: 25.4347,  b: 18,   c: 1.81  },
  { name: 'Long jump',     resultUnit: 'cm',    resultExample: 'eg. 798',   eventType: 'field', day: 'first',  decimals: 2,                   a: 0.14354,  b: 220,  c: 1.4   },
  { name: 'Shot put',      resultUnit: 'm',     resultExample: 'eg. 19.85', eventType: 'field', day: 'first',  decimals: 2,                   a: 51.39,    b: 1.5,  c: 1.05  },
  { name: 'High jump',     resultUnit: 'cm',    resultExample: 'eg. 189',   eventType: 'field', day: 'first',  decimals: 2,                   a: 0.8465,   b: 75,   c: 1.42  },
  { name: '400m',          resultUnit: 's',     resultExample: 'eg. 44.85', eventType: 'track', day: 'first',  decimals: 2, manualTime: 0.14, a: 1.53775,  b: 82,   c: 1.81  },
  { name: '110m hurdles',  resultUnit: 's',     resultExample: 'eg. 13.85', eventType: 'track', day: 'second', decimals: 2, manualTime: 0.24, a: 5.74352,  b: 28.5, c: 1.92  },
  { name: 'Discus throw',  resultUnit: 'm',     resultExample: 'eg. 63.85', eventType: 'field', day: 'second', decimals: 2,                   a: 12.91,    b: 4,    c: 1.1   },
  { name: 'Pole vault',    resultUnit: 'cm',    resultExample: 'eg. 547',   eventType: 'field', day: 'second', decimals: 2,                   a: 0.2797,   b: 100,  c: 1.35  },
  { name: 'Javelin throw', resultUnit: 'm',     resultExample: 'eg. 76.85', eventType: 'field', day: 'second', decimals: 2,                   a: 10.14,    b: 7,    c: 1.08  },
  { name: '1500m',         resultUnit: 'm:ss',  resultExample: 'eg. 2:13.85', eventType: 'track', day: 'second', decimals: 2,                a: 0.03768,  b: 480,  c: 1.85  },
];

export const heptathlonConsts: EventConsts[] = [
  { order: 1, name: '100m hurdles', resultUnit: 's',    resultExample: 'eg. 13.85', eventType: 'track', day: 'first',  decimals: 2, manualTime: 0.24, a: 9.23076,  b: 26.7, c: 1.835 },
  { order: 2, name: 'High jump',    resultUnit: 'cm',   resultExample: 'eg. 182',   eventType: 'field', day: 'first',  decimals: 2,                   a: 1.84523,  b: 75.0, c: 1.348 },
  { order: 3, name: 'Shot put',     resultUnit: 'm',    resultExample: 'eg. 17.06', eventType: 'field', day: 'first',  decimals: 2,                   a: 56.0211,  b: 1.50, c: 1.05  },
  { order: 4, name: '200m',         resultUnit: 's',    resultExample: 'eg. 23.80', eventType: 'track', day: 'first',  decimals: 2, manualTime: 0.24, a: 4.99087,  b: 42.5, c: 1.81  },
  { order: 5, name: 'Long jump',    resultUnit: 'cm',   resultExample: 'eg. 647',   eventType: 'field', day: 'second', decimals: 2,                   a: 0.188807, b: 210,  c: 1.41  },
  { order: 6, name: 'Javelin throw',resultUnit: 'm',    resultExample: 'eg. 57.17', eventType: 'field', day: 'second', decimals: 2,                   a: 15.9803,  b: 3.80, c: 1.04  },
  { order: 7, name: '800m',         resultUnit: 'm:ss', resultExample: 'eg. 2:07.64', eventType: 'track', day: 'second', decimals: 2, manualTime: 0, a: 0.11193,  b: 254,  c: 1.88  },
];

export function calculateCombinedEventsPoints(
  combinedEvents: CombinedEventsCompetition,
  index: number,
  combEvent: string
): CombinedEventsCompetition {
  const allConsts: EventConsts[] = combEvent === 'decathlon' ? decathlonConsts : heptathlonConsts;
  const eventConsts = allConsts[index];

  if (combinedEvents.events[index].result === '') {
    combinedEvents.events[index].points = '';
  } else {
    if (eventConsts.eventType === 'track') {
      combinedEvents.events[index].points = getTrackPoints(eventConsts, combinedEvents.events[index]);
    } else {
      combinedEvents.events[index].points = getFieldPoints(eventConsts, combinedEvents.events[index]);
    }
  }
  combinedEvents = calculateTotals(combinedEvents, allConsts);
  return combinedEvents;
}

export function calculateCombinedEventsResult(
  combinedEvents: CombinedEventsCompetition,
  index: number,
  combEvent: string
): CombinedEventsCompetition {
  const allConsts: EventConsts[] = combEvent === 'decathlon' ? decathlonConsts : heptathlonConsts;
  const eventConsts = allConsts[index];

  if (combinedEvents.events[index].points === '') {
    combinedEvents.events[index].result = '';
  } else {
    if (eventConsts.eventType === 'track') {
      combinedEvents.events[index].result = getTrackResult(eventConsts, combinedEvents.events[index]);
    } else {
      combinedEvents.events[index].result = getFieldResult(eventConsts, combinedEvents.events[index]);
    }
  }
  combinedEvents = calculateTotals(combinedEvents, allConsts);
  return combinedEvents;
}

function calculateTotals(
  competition: CombinedEventsCompetition,
  consts: EventConsts[]
): CombinedEventsCompetition {
  let firstDay = 0;
  let secondDay = 0;
  for (let i = 0; i < competition.events.length; i++) {
    if (competition.events[i].points !== '') {
      if (consts[i].day === 'first') {
        firstDay += parseInt(String(competition.events[i].points));
      } else {
        secondDay += parseInt(String(competition.events[i].points));
      }
    }
  }
  competition.firstDayPoints = firstDay;
  competition.secondDayPoints = secondDay;
  competition.totalPoints = firstDay + secondDay;
  return competition;
}

function getTrackPoints(consts: EventConsts, event: CombinedEvent): number {
  let time: number = event.result as number;
  if (isNaN(event.result as number)) {
    time = parseTime(String(event.result));
  }
  let points: number;
  if (event.manual === true && consts.manualTime !== undefined) {
    const manualTime = parseFloat(String(time)) + consts.manualTime;
    points = Math.floor(consts.a * Math.pow(consts.b - manualTime, consts.c));
  } else {
    points = Math.floor(consts.a * Math.pow(consts.b - time, consts.c));
  }
  return isNaN(points) ? 0 : points;
}

function getTrackResult(consts: EventConsts, event: CombinedEvent): string | number {
  let result = -(Math.pow(Number(event.points) / consts.a, 1 / consts.c) - consts.b);
  if (event.manual === true && consts.manualTime !== undefined) {
    result = result - consts.manualTime;
  }
  if (isNaN(result)) return 0;

  if (result >= 60) {
    const min = parseInt(String(result / 60));
    const sec = parseInt(String(result - min * 60));
    const ms = ((result - min * 60 - sec) * 100).toFixed();
    const secStr = sec < 10 ? '0' + sec.toPrecision(1) : String(sec);
    const msStr = Number(ms) < 10 ? '0' + ms : ms;
    return min + ':' + secStr + '.' + msStr;
  }
  return result.toFixed(consts.decimals);
}

function getFieldResult(consts: EventConsts, event: CombinedEvent): string | number {
  const result = (Math.pow(Number(event.points) / consts.a, 1 / consts.c) + consts.b).toFixed(consts.decimals);
  return isNaN(Number(result)) ? 0 : result;
}

function getFieldPoints(consts: EventConsts, event: CombinedEvent): number {
  const points = Math.floor(consts.a * Math.pow(Number(event.result) - consts.b, consts.c));
  return isNaN(points) ? 0 : points;
}

function parseTime(time: string): number {
  const ind = time.indexOf(':');
  const mins = parseInt(time.substr(0, ind));
  const secs = parseFloat(time.substr(ind + 1, time.length));
  return parseFloat(String(mins * 60 + secs));
}
