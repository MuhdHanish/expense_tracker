import moment from "moment-timezone";

export const formattedDateDescription = () => {
    const timeZone = moment.tz.guess();
    const date = new Date();
    const timeOptions: Intl.DateTimeFormatOptions = {
        timeZone,
        weekday: "long",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    };
    const formattedDate = date.toLocaleDateString("en-US", timeOptions);
    return formattedDate;
};