// @ts-nocheck
// @ts-ignore
"use client";

import { useGetCalls } from '@/hooks/useGetCalls';
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, useRef } from 'react'
import MeetingCard from '@/components/MeetingCard';
import Upcoming from '@/app/(root)/(home)/Upcoming/page';
import Meeting from '@/app/(root)/(home)/meeting/[id]/page';
import VideoPlayerModal from './VideoPlayerModal';
import { useUser } from '@clerk/nextjs';

function CallList({type}: {type: 'ended' | 'upcoming' | 'recordings'}) {
    const user = useUser();
    const {endedCalls , upcomingCalls , recordings , isLoading} = useGetCalls();
    const router = useRouter();
    const [recording, setrecording] = useState<CallRecording[]>([])
    
    // State for video player modal
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [currentVideo, setCurrentVideo] = useState<{url: string; title: string; posterUrl?: string} | null>(null);

    const getcalls = () =>{
        switch (type) {
            case 'ended':
                return endedCalls;
            case 'upcoming':
                return upcomingCalls;
            case 'recordings':
                return recording;
            default:
                return [];
        }
    }
    const getNoCallsMessage = () =>{
        switch (type) {
            case 'ended':
                return 'No ended calls';
            case 'upcoming':
                return 'No upcoming calls';
            case 'recordings':
                return 'No recordings';
            default:
                return []; 
        }
    }
    // recordings functions to get the all recording video 
    const hasFetchedRef = useRef(false);

    useEffect(() => {
        const fetchRecordings = async () => {
            try {
                const callData = await Promise.all(
                    recordings.map(async (meeting) => {
                        try {
                            return await meeting.queryRecordings();
                        } catch (error) {
                            console.log(`Error fetching recordings for meeting ${meeting.id}:`, error);
                            return { recordings: [] }; // بهتر از string هست
                        }
                    })
                );
    
                const processedRecordings = callData
                    .filter(call => call && call.recordings && call.recordings.length > 0)
                    .flatMap(call => call.recordings);
    
                setrecording(processedRecordings);
            } catch (error) {
                console.error('Error fetching recordings:', error);
                setrecording([]);
            }
        };
    
        if (type === 'recordings' && recordings.length > 0 && !hasFetchedRef.current) {
            fetchRecordings();
            hasFetchedRef.current = true;
        }
    }, [type, recordings]);

    const calls = getcalls();
    const NoCallsMessage = getNoCallsMessage();

    return (
    <>
      <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
        {
            calls.length > 0 ? calls.map((meeting: Call | CallRecording) => (
                <MeetingCard 
                key={type === 'recordings' ? (meeting as CallRecording).id || `recording-${Math.random()}` : (meeting as Call).id}
                icon={
                    type === 'ended'
                    ? '/icons/previous.svg'
                    : type === 'upcoming'
                    ? '/icons/upcoming.svg'
                    : '/icons/recordings.svg'
                }
                title={type === 'recordings' 
                    ? `Recording: ${(meeting as CallRecording).filename.substring(0 , 25) || (meeting as CallRecording).id?.substring(0, 10) || 'Untitled Recording'}` 
                    : ((meeting as Call).state?.custom?.description?.substring(0, 20) || '')
                }
                date={type === 'recordings' 
                    ? (meeting as CallRecording).start_time?.toLocaleString() || 'Unknown date'
                    : ((meeting as Call).state?.startsAt?.toLocaleString() || 'Unknown date')
                }
                isPreviousMeeting={type === 'ended'}
                buttonIcon1={type === 'recordings' ?  '/icons/play.svg' : undefined}
                buttonText={type === 'recordings' ? 'Play' : 'Start'}
                handleClick={type === 'recordings' ? () => {
                    // Open video in modal instead of navigating away
                    const recording = meeting as CallRecording;
                    setCurrentVideo({
                        url: recording.url || '',
                        title: `Recording ${recording.id?.substring(0, 10) || ''}`,
                        // Add thumbnail/poster if available
                        posterUrl: recording.thumbnail_url || undefined
                    });
                    setIsVideoModalOpen(true);
                } : () => {
                    // For non-recordings, keep the original behavior
                    router.push(`/meeting/${meeting.id}`)
                }}
                link={type === 'recordings' ? meeting.url : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`}
                
                 />
            )) : (
                <h1 className="text-center text-lg">{NoCallsMessage}</h1>
            )
        }
      </div>
      
      {/* Video Player Modal */}
      {currentVideo && (
        <VideoPlayerModal 
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
          title={currentVideo.title}
          videoUrl={currentVideo.url}
          posterUrl={currentVideo.posterUrl}
        />
      )}
    </>
  )
}

export default CallList;
