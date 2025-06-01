'use client'

import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation';
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from "@/hooks/use-toast";
import { title } from 'process';
import { Input } from './ui/input';



function MeetingTypeList() {
  // Router for navigation to different pages
  const router = useRouter();
  
 
  // - undefined: No modal is shown
  const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined >(undefined);
  
  // Get current user from Clerk authentication
  const {user} = useUser();
  
  // Stream Video SDK client for video meeting functionality
  const client = useStreamVideoClient();

  // Toast notification hook for showing success/error messages
  const { toast } = useToast();

  // Form values for meeting details
  const [values, setvalues] = useState({
    dateTime: new Date(),  // For scheduling meeting date and time
    description: '',       // For meeting description
    link:'',               // For storing the meeting link when joining
   })
  
  // Stores the created call details after a meeting is created
  const [callDetails, setcallDetails] = useState<Call>()
  
  // Stores the meeting link for copying in success modals
  const [, setMeetingLink] = useState('')
  
  // Tracks whether to show success modal after joining/scheduling a meeting
  const [joinSuccess, setJoinSuccess] = useState(false)
    
   /**
   * Creates a new meeting using Stream Video SDK
   * 
   * This function handles:
   * 1. Validation of required fields
   * 2. Creating a new meeting with Stream Video SDK
   * 3. Setting meeting details like start time and description
   * 4. Navigating to the meeting or showing success modal
   * 5. Error handling with toast notifications
   */
  const createMeeting = async() =>{
    // Exit if client or user is not available (authentication/connection check)
    if(!client || !user) return;

    try {
      // Validate that date/time is selected
      if(!values.dateTime){
        toast({
          title: "Please select the time!",
          variant: "destructive"
        });
        return;
      }
      
      // Generate a unique ID for the meeting
      const id = crypto.randomUUID();
      
      // Create a call instance with the Stream client
      const call = client.call('default', id);
      if(!call) throw new Error('Failed to create call ')
      
      // Format meeting details
      const startAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant Meeting';

      // Create the meeting on Stream's servers
      await call.getOrCreate({
        data:{
          starts_at: startAt,
          custom:{
            description
          }
        }
      })
      
      // Store call details and meeting link for later use
      setcallDetails(call);
      setMeetingLink(`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${call.id}`);
      
      // For instant meetings (no description), navigate directly to meeting
      // For scheduled meetings, show success modal
      if(!values.description) {
        router.push(`/meeting/${call.id}`)
      } else {
        setJoinSuccess(true);
      }
      
      // Show success notification
      toast({
        title: "Meeting created successfully",
        variant: "default"
      })
    } catch (error) {
      // Handle any errors during meeting creation
      toast({
        title: "Failed to create meeting",
        variant: "destructive"
      })
    }
  };

  return (
    // Main grid container for meeting options - responsive grid layout
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
   
      {/* Instant Meeting Card - Orange card for starting a new meeting immediately */}
      <HomeCard
          img="/icons/add-meeting.svg"
          title="New Meeting"
          description="Start an instant meeting"
          className="bg-[#F9A90E]" 
          handleClick={() => setMeetingState('isInstantMeeting')} // Shows instant meeting modal
      />
      
      {/* Join Meeting Card - Blue card for joining an existing meeting */}
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        className="bg-[#0E78F9]"
        handleClick={() => setMeetingState('isJoiningMeeting')} // Shows join meeting modal
      />
      
      {/* Schedule Meeting Card - Purple card for planning future meetings */}
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-[#830EF9]"
        handleClick={() => setMeetingState('isScheduleMeeting')} // Shows schedule meeting modal
      />
      
      {/* View Recordings Card - Orange card that navigates to recordings page */}
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting Recordings"
        className="bg-[#F9A90E]"
        handleClick={() => router.push('/Recordings')} // Direct navigation without modal
      />

      {/* Instant Meeting Modal - Simple modal with just a button to start an instant meeting */}
      <MeetingModal
      isOpen={meetingState === 'isInstantMeeting'} // Only visible when isInstantMeeting state is set
      onClose={() => setMeetingState(undefined)} // Closes the modal when clicking outside or X
      title="Start an Instant Meeting"
      className="text-center"
      buttonText="Start Meeting"
      handleClick={createMeeting} // Creates a new instant meeting
      >
      
      </MeetingModal>
   
      {/* Join Meeting Modal - Simple modal with input for meeting link */}
      <MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Join a Meeting"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => {
          // Validate link before proceeding
          if (values.link) {
            // Navigate directly to the meeting link
            router.push(values.link);
          } else {
            // Show error if no link provided
            toast({
              title: "Please enter a meeting link",
              variant: "destructive"
            });
          }
        }}
      >
        <div className="flex flex-col gap-3">
          {/* Meeting Link Input Field */}
          <label htmlFor="input" className='text-white font-semibold'>Meeting Link</label>
          <Input
            
            
            className="border-none bg-[#252A41] text-white focus-visible:ring-0 focus-visible:ring-offset-0 rounded"
            value={values.link}
            onChange={(e) => setvalues({...values, link: e.target.value})}
          />
        </div>
      </MeetingModal>
      
      {/* Schedule Meeting Flow - Conditionally renders scheduling form or success modal */}
      {!joinSuccess ? (
        // Step 1: Form for scheduling a new meeting
        <MeetingModal
        isOpen={meetingState === 'isScheduleMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Schedule a Meeting"
        className="text-center"
        buttonText="Schedule Meeting"
        handleClick={createMeeting} // Uses the same createMeeting function as instant meetings
        >
          <div className="flex flex-col gap-3">
            {/* Date and Time Selector */}
            <input 
              type="datetime-local" 
              className="w-full bg-[#2D3142] text-white rounded-[5px] px-4 py-2 focus:outline-none"
              value={values.dateTime.toISOString().slice(0, 16)}
              onChange={(e) => setvalues({...values, dateTime: new Date(e.target.value)})}
            />
            {/* Meeting Description Text Area */}
            <textarea 
              placeholder="Meeting description" 
              className="w-full bg-[#2D3142] text-white rounded-[5px] px-4 py-2 focus:outline-none"
              value={values.description}
              onChange={(e) => setvalues({...values, description: e.target.value})}
            />
          </div>
        </MeetingModal>
      ) : (
        // Step 2: Success modal after successfully scheduling a meeting
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => {
            setMeetingState(undefined); // Close the modal
            setJoinSuccess(false); // Reset success state for next time
          }}
          title="Meeting Created"
          handleClick={() => {
            // Prepend https:// if not already present and copy to clipboard
            const linkToCopy = meetingLink.startsWith('https://') ? meetingLink : `https://${meetingLink}`;
            navigator.clipboard.writeText(linkToCopy);
            toast({ title: 'Link Copied' });
          }}
          image="/icons/checked.svg" // Blue checkmark icon
          buttonIcon="/icons/copy.svg" // Copy icon for the button
          className=""
          buttonText="Copy Meeting Link"
        />
      )}
  </section>
  )
}

export default MeetingTypeList