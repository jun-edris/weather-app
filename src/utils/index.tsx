export const convertToCelcius = (k: number) => {
    return Math.round(k - 273.15);
};

export const convertToTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);

    const hrs = date.getHours();
    const min = date.getMinutes();
    const ampm = hrs >= 12 ? 'PM' : 'AM';

    const convertedHRS = hrs % 12;
    const convertedMin = min < 10 ? '0' + min : min;

    return convertedHRS + ':' + convertedMin + ' ' + ampm;
};

export const convertToDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);

    let day = date.getDate();
    let month = date.getMonth() + 1;

    return toMonthName(month) + ' ' + day;
};

export const toMonthName = (monthNumber: number) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString('en-US', {
        month: 'short',
    });
};