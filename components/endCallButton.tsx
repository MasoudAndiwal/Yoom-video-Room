'use client '
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React from 'react'

function EndCallButton() {
    const router = useRouter();
    const call = useCall();
    const {useLocalParticipant} = useCallStateHooks();
    const LocalParticipant = useLocalParticipant();

    const isMeetingOwner = LocalParticipant && call?.state.createdBy && LocalParticipant.userId === call.state.createdBy.id;
    if(!isMeetingOwner) return null;
  return (
    <button className='rounded-[5px] bg-red-500 px-4 py-2 text-white font-semibold hover:bg-red-600' onClick={async ()=> {await call?.endCall(); router.push('/')}}>End Call`s</button>
  )
}

export default EndCallButton