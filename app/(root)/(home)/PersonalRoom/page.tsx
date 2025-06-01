'use client'
import { Description } from '@radix-ui/react-toast'
import React from 'react'
import { useUser } from '@clerk/nextjs'
import { User } from '@clerk/nextjs/server'
import { Button } from '@/components/button'
import { title } from 'process'
import { useToast } from '@/hooks/use-toast'
import { useGetCallById } from '@/hooks/useGetCallById'
import { useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'

const Table = ({title , Description}: {title:string , Description:string}) => {
    return (
        <div className='flex flex-col gap-2 items-start xl:flex-row'>
            <h1 className='text-base font-medium text-[#C9DDFF]'>{title}</h1>
            <h1 className='truncate text-sm font-bold max-sm:max-w-[320px] lg:text-x1'>{Description}</h1>
        </div>
    )
}
function PersonalRoom() {
  const { toast } = useToast();
  const user = useUser();
  const meetingId = user?.user?.id;
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;
  const { call } = useGetCallById(meetingId!);
  const client = useStreamVideoClient();
  const router = useRouter();


  const startRoom = async () => {
    if(!client) return; // Only check for client, not call
    try {
      const newCall = client.call('default', meetingId!)
      await newCall.getOrCreate({
        data:{
          starts_at: new Date().toISOString(),
          custom: {
            description: `${user?.user?.username}'s Personal Room`
          }
        }
      })
      router.push(`/meeting/${meetingId}?personal=true`)
    } catch (error) {
      console.error("Failed to create meeting:", error);
      toast({
        title: "Failed to create meeting",
        variant: "destructive"
      });
    }
  }
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
    <h1 className='text-3xl font-bold'>
      Personal Room
      </h1>
      <div className='flex w-full flex-col gap-8 xl:max-w-[900px]'>
        <Table title="Topic : " Description={`${user?.user?.username}'s Meeting Room`}/>
        <Table title="Meeting ID : " Description={meetingId!}/>
        <Table title="Invit Link : " Description={meetingLink.slice(0, 40) + '...'}/>
      </div>
      <div className='flex gap-5'>
        <Button className='bg-[#0E78F9] rounded' onClick={startRoom}>Start Meeting</Button>
        <Button className='bg-[#1E2757] rounded' onClick={() => {
          navigator.clipboard.writeText(meetingLink);
          toast({
            title: 'Link Copied',
          });
        }}>
          Copy Link
        </Button>
      </div>
</section>
)
}

export default PersonalRoom