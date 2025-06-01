import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './button';

function MeetingSetup({setIsSetupComplete}: {setIsSetupComplete: (value: boolean) => void} ) {
  const [isMicCamToggLedOn, setisMicCamToggLedOn] = useState(false);
  const call = useCall();
  if(!call){
    throw new Error("usecall must be used within StreamCall component")
  }
  useEffect(() => {
    if(isMicCamToggLedOn){
      call?.camera.disable()
      call?.microphone.disable()
    }else{
      call?.camera.enable()
      call?.microphone.enable()
    }
  }, [isMicCamToggLedOn , call?.camera , call?.microphone ])
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-3 text-white '>
      <h1 className='text-2xl font-bold '>Setup</h1>
      <VideoPreview />
      <div className='flex items-center gap-3 h-16 justify-center'>
        <label className='flex items-center gap-2'>
          <input type="checkbox" checked={isMicCamToggLedOn} onChange={(e) => setisMicCamToggLedOn(e.target.checked)} />
          Join with  mic and camera off
        </label>
        <DeviceSettings />
      </div>
      <Button className='rounded-[5px] bg-green-500 px-4 py-2'
       onClick={() => {
        call.join()
        setIsSetupComplete(true)
       }}>
        Join Meeting
      </Button>
    </div>

  )
}

export default MeetingSetup