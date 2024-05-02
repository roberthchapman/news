const { DateTime } = require("luxon");

export const getTimeAgo = (dateTime: string) => {
    const convertedDateTime = DateTime.fromISO(dateTime);
    const dt = DateTime.utc();
    const diff = dt.diff(convertedDateTime, ["minutes", "hours", "days", "months", "years"])
    if(diff.minutes < 60){
        return `${Math.round(diff.minutes)} minute${Math.round(diff.minutes) !== 1 ? 's': ''}`;
    }
    if(diff.hours < 24){
        return `${Math.round(diff.hours)} hour${Math.round(diff.hours) !== 1 ? 's': ''}`;
    } ///etc
    return DateTime.utc().diff(convertedDateTime, 'hours').hours; 
}

export const getWebDomain = (url: string) => {
    return url ? new URL(url).hostname.replace('www.', '') : '';
}