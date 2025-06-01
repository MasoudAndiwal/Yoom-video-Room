import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import { LayoutList,  Users } from "lucide-react";
import EndCallButton from './endCallButton';
import Loader from './Loader';
type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

function MeetingRoom() {

  const {useLocalParticipant, useCallState} = useCallStateHooks();
  const LocalParticipant = useLocalParticipant();
  const callState = useCallState();

  // if(callState !== CallingState.JOINED) {
  //   return <Loader />
  // }
  const router = useRouter();
  const [showParticipants, setShowParticipants] = useState(false);
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const [isPersonalRoom] = useState(false); 
  const callLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />;
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  // Function to handle layout selection with proper format conversion
  const handleLayoutChange = (layoutType: string) => {
    // Convert layout names to the correct format
    const formattedLayout = layoutType.toLowerCase().replace('-', '') as CallLayoutType;
    
    // Map to the correct enum value
    if (formattedLayout === 'grid') {
      setLayout('grid');
    } else if (formattedLayout === 'speakerleft') {
      setLayout('speaker-left');
    } else if (formattedLayout === 'speakerright') {
      setLayout('speaker-right');
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          {callLayout()}
        </div>
        <div className={cn('h-[calc(100vh-86px)] ml-2', {'hidden': !showParticipants})}>
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 flex w-full items-center justify-center gap-3 sm:gap-5 py-4 sm:py-5 px-2 sm:px-4 flex-wrap z-10 mb-2 ">
        <CallControls onLeave={() => router.push('/')} />
        
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d6a] px-4 py-2 hover:bg-[#4c535b]">
            <LayoutList size={20} className="text-white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border-[#1C1F2E] bg-[#1C1F2E] text-white">
            {['Grid', 'Speaker Left', 'Speaker Right'].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  onClick={() => handleLayoutChange(item)}
                  className="cursor-pointer hover:bg-[#2d3748]"
                >
                  {item}
                </DropdownMenuItem>
                {index < 2 && <DropdownMenuSeparator className="border-[#2d3748]" />}
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>  
        <CallStatsButton />
        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
            <Users size={20} className="text-white" />
          </div>
        </button>
        {!isPersonalRoom && (
         <EndCallButton />
        )}
      </div>
    </section>
  );
}

export default MeetingRoom;
