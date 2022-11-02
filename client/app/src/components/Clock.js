import { useEffect, useState } from "react";

function Clock(){
    let [time, setTime] = useState(new Date());

    const style_clock = {
        // marginRight: '-24px'
    }

    useEffect(()=>{
        const id = setInterval(()=>{
            setTime(new Date())
        }, 1000);
        return ()=>clearInterval(id);
    }, [])

    return (
        <h2 className='mb-0 me-5' style={style_clock}>{time.toLocaleTimeString('en-US', {hour12: false})}</h2>
    )
}

export default Clock;