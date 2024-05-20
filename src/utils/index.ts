import dayjs from 'dayjs';

export const capatiliseFirstLetter = (word: string) => {
    if (typeof word !== 'string' || word.length === 0) {
        return '';
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export const massageGraphData = (data: Array<any>, type: string, transformedApplications: any) => {
    if (!(data.length && data.length > 0)) return [];

    const groupedData = data.reduce((acc, cur) => {
        const appId = cur.applicationId;
        if (!acc[appId]) {
            acc[appId] = {
                labels: [],
            };
            acc[appId][type] = [];
        }
        acc[appId].labels.push(dayjs.unix(Number(cur.timestamp)).format('hh:mm A'));
        acc[appId][type].push(Number(cur[type]));
        return acc;
    }, {});
    const colors = [
        '#6E27D5',
        '#B88BFE',
        '#F39C12',
        '#FF00E5',
        '#00B88C'
    ];

    const datasets = Object.keys(groupedData).map((appId, index) => ({
        label: `${transformedApplications[appId].name}`,
        data: groupedData[appId][type],
        fill: false,
        backgroundColor: colors[index % colors.length],
        borderColor: colors[index % colors.length],
    }));

    return {
        labels: groupedData[Object.keys(groupedData)[0]].labels,
        datasets
    };
}

export const getLastUpdatedString = (timestamp: number) => {
    const now = Math.floor(Date.now() / 1000);
    const diffInSeconds = now - timestamp;

    const secondsInHour = 3600;
    const secondsInDay = 86400;
    const secondsInWeek = 604800;
    const secondsInYear = 31536000;

    if (diffInSeconds < secondsInDay) {
        const diffInHours = Math.floor(diffInSeconds / secondsInHour);
        return `Last updated ${diffInHours} hours ago`;
    } else if (diffInSeconds < secondsInWeek) {
        const diffInDays = Math.floor(diffInSeconds / secondsInDay);
        return `Last updated ${diffInDays} days ago`;
    } else if (diffInSeconds < secondsInYear) {
        const diffInWeeks = Math.floor(diffInSeconds / secondsInWeek);
        return `Last updated ${diffInWeeks} weeks ago`;
    } else {
        const diffInYears = Math.floor(diffInSeconds / secondsInYear);
        return `Last updated ${diffInYears} years ago`;
    }
};