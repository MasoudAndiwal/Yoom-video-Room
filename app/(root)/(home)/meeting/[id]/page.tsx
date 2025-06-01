"use client"

import React from 'react'
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useState } from 'react';
import MeetingSetup from '@/components/MeetingSetup';
import MeetingRoom from '@/components/MeetingRoom';
import { useGetCallById } from '@/hooks/useGetCallById';
import Loader from '@/components/Loader';

function Meeting({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = React.use(params);
    const {user , isLoaded} = useUser();
    const [isSetupComplete, setIsSetupComplete] = useState(false)
    const {call , isCallLoading} = useGetCallById(resolvedParams.id)
    if(!isLoaded || isCallLoading) return <Loader />;
    return (
       <main className='h-screen w-full'> 
        
        <StreamCall call={call}>
        
        <StreamTheme>
            {!isSetupComplete ? (
                <div className='flex h-full items-center justify-center'>
                    <MeetingSetup setIsSetupComplete={setIsSetupComplete} />    
                </div>
            ) : (
                <MeetingRoom />
            )}
        </StreamTheme>
        </StreamCall>
    
        
       </main>
    )
}

export default Meeting