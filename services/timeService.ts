// TS: 'string | number' means a parameter can be either type.
// timeToSeconds accepts strings from input fields OR numbers from code.

export function timeToSeconds(
  hours: string | number,
  mins: string | number,
  secs: string | number
): number {
  if (isNaN(hours as number) || hours === '') hours = 0;
  if (isNaN(mins as number) || mins === '') mins = 0;
  if (isNaN(secs as number) || secs === '') secs = 0;
  return parseInt(
    String(parseInt(String(hours)) * 3600 + parseInt(String(mins)) * 60 + parseInt(String(secs)))
  );
}

export function formatTime(secs: number, format?: string): string {
  let hours = parseInt(String(secs / 3600));
  secs = secs - hours * 3600;
  let mins = parseInt(String(secs / 60));
  let sec = parseInt(String(secs - mins * 60));
  let ms = parseInt(String((secs - sec) * 100));

  // TS: These local variables are reassigned to strings — TypeScript allows this
  // because we declared them with 'let' (not 'const') and they're used as 'any' here
  let minsStr: string | number = mins;
  let secStr: string | number = sec;
  let msStr: string | number = ms;

  if (mins < 10) minsStr = '0' + mins.toPrecision(1);
  if (sec < 10) secStr = '0' + sec.toPrecision(1);
  if (ms < 10) msStr = '0' + ms.toPrecision(1);
  else msStr = ms.toFixed(2);

  let result = hours + ':' + minsStr + ':' + secStr;
  if (format === 'mm:ss.ms') {
    result = minsStr + ':' + secStr + '.' + msStr;
  }
  return result;
}

// TS: This interface defines the shape of the object formatTimeObject returns.
// It's like documenting a function's return value — TypeScript enforces it.
export interface TimeObject {
  hours: number;
  minutes: string;
  seconds: string;
}

export function formatTimeObject(secs: number): TimeObject {
  secs = Math.round(secs);
  let hours = parseInt(String(secs / 3600));
  secs = secs - hours * 3600;
  let mins = parseInt(String(secs / 60));
  let sec = parseInt(String(secs - mins * 60));

  // TS: Initialize as numbers, then possibly reassign to strings below
  let minsStr: string | number = mins;
  let secStr: string | number = sec;

  if (mins < 10 && mins !== 0) minsStr = '0' + mins.toPrecision(1);
  if (sec < 10 && sec !== 0) secStr = '0' + sec.toPrecision(1);
  if (mins === 0) minsStr = '00';
  if (sec === 0) secStr = '00';

  return { hours, minutes: String(minsStr), seconds: String(secStr) };
}
