import { useEffect, useState } from "react";

export default function QuestionTimer({timeout, onTimeOut})
{   
    const [remainingTime, setRemainingTime]=useState(timeout)
    
    useEffect(()=>
    {
    const timer= setTimeout(onTimeOut,timeout);
    
    return ()=>{clearTimeout(timer)}

    },[]);

    useEffect(()=>
    {
        const interval=setInterval(()=>
        {
            setRemainingTime(prevRemainingTime=>prevRemainingTime-100)
        }, 100)

        return ()=>{clearInterval(interval)}
    
    },[]);
   
    return <progress max={timeout} value={remainingTime}/>
}