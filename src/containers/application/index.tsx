import { useEffect, useCallback, useState, } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
    ADD_CPU_UTILISATION,
    ADD_MEMORY_UTILIZATION,
    ADD_EVENT_HISTORY,
} from '../../redux/action';
import { fetcher } from '../../ApiService';
import { API_URL } from '../../constants';
import EnvironmentVariable from '../../components/ApplicationItems/EnvironmentVariable';
import Alerts from "../../components/ApplicationItems/Alerts";
import EventHistory from "../../components/ApplicationItems/EventHistory";
import Overview from "../../components/ApplicationItems/Overview";
import StatusChip from "../../components/StatusChip";

const OPTIONS = ["Overview", "Environment Variables", "Alerts", "Event history"];


const Applications = () => {
    const fetcherService = useCallback(fetcher({ useAbortController: false }), []);
    const currentApplication = useSelector((state) => state.appDetailsReducer.currentApplication) || [];
    const dispatch = useDispatch();


    const [selectedOption, setOption] = useState(OPTIONS[0]);
    const handleClickOption = (currOption: string) => {
        setOption(currOption);
    }


    useEffect(() => {
        fetchMemoryUtilisation();
        fetchCpuUtilisation();
        fetchEventHistory();
    }, []);

    const fetchMemoryUtilisation = async () => {
        const autoResults: any = await fetcherService({ apiUrl: API_URL.MEMORY_UTILISATION });
        if (autoResults?.data.length > 0) {
            dispatch({
                type: ADD_MEMORY_UTILIZATION,
                data: autoResults?.data || []
            })
        }
    };

    const fetchCpuUtilisation = async () => {
        const autoResults: any = await fetcherService({ apiUrl: API_URL.CPU_UTILISATION });
        if (autoResults?.data.length > 0) {
            dispatch({
                type: ADD_CPU_UTILISATION,
                data: autoResults?.data || []
            })
        }
    };
    const fetchEventHistory = async () => {
        const autoResults: any = await fetcherService({ apiUrl: API_URL.EVENT_HISTORY });
        if (autoResults?.data.length > 0) {
            dispatch({
                type: ADD_EVENT_HISTORY,
                data: autoResults?.data || []
            })
        }
    };
    return (
        <div className=''>
            <div className="flex justify-between my-3 mb-2">
                <div className="App_Name font-bold text-xl">
                    {currentApplication?.name}
                </div>
                <div className="flex">
                    <div>
                        <StatusChip
                            text={'Deployed'}
                            status={'success'}
                        />
                    </div>
                </div>
            </div>
            <div>
                <div className="flex">
                    {OPTIONS.map((ele) => {
                        const isSelected = !!(ele === selectedOption);
                        return (
                            <div
                                key={ele}
                                className={`text-sm ${isSelected ? `font-bold` : `text-color-grey-light`} p-2 cursor-pointer`}
                                onClick={() => handleClickOption(ele)}
                            >
                                {ele}
                            </div>)
                    })}
                </div>
                <div>
                    {selectedOption === 'Overview' &&
                        <Overview />}
                    {selectedOption === 'Environment Variables'
                        &&
                        <EnvironmentVariable />}
                    {selectedOption === 'Alerts'
                        &&
                        <Alerts />}
                    {selectedOption === 'Event history'
                        &&
                        <EventHistory />}
                </div>
            </div>
        </div>
    )
};

export default Applications;