import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { massageGraphData } from '../utils';


const UseGraphPlotHook = ({
    data,
    type
}) => {
    const [result, setResult] = useState([]);
    const applications = useSelector((state) => state.appDetailsReducer.applications) || [];
    const transformedApplications = applications.reduce((acc, obj) => {
        acc[obj.id] = obj;
        return acc;
    }, {});

    useEffect(() => {
        if ((data && data.length > 0)) {

            const massagedData = massageGraphData(data, type, transformedApplications);
            setResult(massagedData);
        }
    }, [data]);

    return {
        data: result || [],
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                }
            },
            scales: {
                x: {
                    display: true
                },
                y: {
                    display: true,
                    min: 0,
                    max: type === 'cpuUtilization' ? 100 : 50
                }
            },
            tooltip: {
                callbacks: {
                    title: (tooltipItems) => {
                        const item = tooltipItems[0];
                        const date = new Date(item.parsed.x);
                        return date.toLocaleString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true,
                        });
                    },
                    label: (tooltipItem) => {
                        const dataset = tooltipItem.dataset;
                        const value = tooltipItem.raw;
                        const label = dataset.label || '';
                        const color = dataset.borderColor;
                        return `${label}: ${value}`;
                    },
                    labelColor: (tooltipItem) => {
                        const dataset = tooltipItem.dataset;
                        return {
                            borderColor: dataset.borderColor,
                            backgroundColor: dataset.borderColor,
                            borderWidth: 2,
                            borderDash: [2, 2],
                            borderRadius: 20,
                        };
                    },
                },
            },
        }
    }

};

export default UseGraphPlotHook;