import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";

export default function Dashboard({ auth, times }) {
    const [data, setData] = useState({
        user_id: auth.user.id,
        clockIn: false,
        startTime: '',
        endTime: '',
        breakStart: '',
        breakEnd: ''
    })
    const [timer, setTimer] = useState(0);

    useEffect(()=>{
        let interval;
        if (data.clockIn){
            interval = setInterval(()=>{
                setTimer((prevState) => prevState + 1)
            },1000)
        }else {
            clearInterval(interval)
        }

        return () => clearInterval(interval)
    },[data.clockIn])

    const handleClockInOut = useCallback(async (e)=>{
        e.preventDefault();
        let formData = data
        if (data.clockIn){
            const endTime = new Date().toISOString();
            setData((prevState)=>({...prevState, endTime: endTime}))
            formData = {...formData, endTime}
        }else {
            const startTime = new Date().toISOString();
            setData((prevState)=>({...prevState, startTime: startTime}))
            formData = {...formData, startTime}
        }
        setData((prevState)=>({...prevState, clockIn: !data.clockIn}))
        const response = await axios.post(route('time-reports.store'),formData)
        console.log(response)
        if (data.clockIn){
            setData((prevState)=>({...prevState, clockIn: false}))
            setTimer(0)
        }
        // setData((prevState) => ({...prevState, clockIn: !prevState.clockIn}))
    },[data])

    const formatTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes =  Math.floor((timeInSeconds % 3600) / 60)
        const seconds = timeInSeconds % 60;
        return `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`
    }

    const handleStartBreak = useCallback(async ()=>{
        const startBreakTime = new Date().toISOString();
        setData((prevState)=>({...prevState, breakStart: startBreakTime, clockIn: false}))
        let formData = data
        formData = {...formData, clockIn: false, breakStart: startBreakTime}
        const response = await axios.post(route('time-reports.store'),formData)
    },[data])

    const handleEndBreak = useCallback(async ()=>{
        const endBreakTime = new Date().toISOString();
        setData((prevState)=>({...prevState, breakEnd: endBreakTime, clockIn: true}))
        let formData = data
        formData = {...formData, clockIn: true,breakEnd: endBreakTime}
        const response = await axios.post(route('time-reports.store'),formData)
        setData((prevState)=>({...prevState, breakEnd: null, breakStart: null, clockIn: true}))
    },[data])

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">User List</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div>
                            Timer
                        </div>
                        <div>
                            <span>Time Worked</span>
                            <span className="ml-2">{data.clockIn ? formatTime(timer) : formatTime(timer)}</span>
                        </div>
                        <form onSubmit={handleClockInOut}>
                            <input type="hidden" name="user_id" value={auth.user.id}/>
                            <PrimaryButton
                                className="mr-2">{data.clockIn ? 'Clock Out' : 'Clock In'}</PrimaryButton>
                        </form>
                        {
                            (data.clockIn && !data.breakStart) && (
                                <PrimaryButton type="button" className="mr-2" onClick={handleStartBreak}>Start Break</PrimaryButton>
                            )
                        }
                        {
                            (data.breakStart) && (
                                <PrimaryButton type="button" className="mr-2" onClick={handleEndBreak}>End Break</PrimaryButton>
                            )
                        }
                        {/*{*/}
                        {/*    data.clockIn && !data.breakStart && (*/}
                        {/*        <button type="button" className="mr-2" onClick={handleStartBreak}>Start Break</button>*/}
                        {/*    )*/}
                        {/*}*/}
                        {/*{*/}
                        {/*    data.clockIn && data.breakStart && (*/}
                        {/*        <button type="button"  className="mr-2" onClick={handleEndBreak}>End Break</button>*/}
                        {/*    )*/}
                        {/*}*/}
                        {/*<PrimaryButton className="mr-2">Start time</PrimaryButton>*/}
                        {/*<PrimaryButton className="mr-2 bg-red-600">Break time</PrimaryButton>*/}
                        {/*<PrimaryButton className="mr-2 bg-red-600">End time</PrimaryButton>*/}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
