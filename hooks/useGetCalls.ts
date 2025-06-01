"use client";
    
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"

export const useGetCalls = () => {
    const [calls, setCalls] = useState<Call[]>([]);
    const [isLoading, setIsLoading] = useState(false)
    const client = useStreamVideoClient();
    const {user} = useUser();
    useEffect ( ()=>{
        const loadCalls = async () =>{
        if(!client || !user?.id) return;
        setIsLoading(true);
        try {
            const {calls} = await client.queryCalls({
                sort: [{field: 'starts_at' , direction: -1}],
                filter_conditions:{
                    starts_at:{$exists: true},
                    $or:[
                        {created_by_user_id: user.id},
                        {members: {$in : [user.id]}}
                        
                    ]
                }
            });
            setCalls(calls);
        } catch (error) {
            console.log(error)
        }finally{
            setIsLoading(false);
        }
    }
    loadCalls();
    } , [client ,user?.id])
    const now = new Date();
    const endedCalls: Call[] = calls.filter((call)=>{
        // Get start time safely
        const startsAt = call.state.startsAt;
        // Check if call has a start time in the past
        return startsAt && new Date(startsAt) < now;
    });
    
    const upcomingCalls: Call[] = calls.filter((call)=>{
        // Get start time safely
        const startsAt = call.state.startsAt;
        // Only include calls with future start times
        return startsAt && new Date(startsAt) > now;
    });
    // Use ended calls for recordings since they're the only ones that can have recordings
    const recordings: Call[] = endedCalls.filter((call) => {
        // We can't directly check if a call has recordings, but ended calls are potential candidates
        return call.state.endedAt !== undefined && call.state.endedAt !== null;
    });
    
    return {
        endedCalls,
        upcomingCalls,
        recordings,
        isLoading   
    }

}