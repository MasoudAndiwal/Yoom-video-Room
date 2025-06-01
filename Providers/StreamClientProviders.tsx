"use client";

import { generateStreamToken } from "@/actions/stream.action";
import Loader from "@/components/Loader";
import { useUser } from "@clerk/nextjs";
import { StreamVideo, StreamVideoClient, User } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

  
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

   
   const StreamVideoProviders = ({children}: {children: React.ReactNode}) => {
    const [videoClient, setVideoClient] = useState<StreamVideoClient>();
    const [isConnecting, setIsConnecting] = useState(false);
    const {user , isLoaded} = useUser();
    
    useEffect(() => {
      const initClient = async () => {
        if (!user || !isLoaded || isConnecting) return;
        if (!apiKey) throw new Error('The API key is not configured');

        const streamUser: User = {
          id: user.id,
          name: user.username || user.id,
          image: user.imageUrl,
        };

        try {
          setIsConnecting(true);
          if (videoClient) {
            await videoClient.disconnectUser();
          }
          const response = await generateStreamToken();
          const client = new StreamVideoClient(apiKey, { timeout: 10000 });
          await client.connectUser(streamUser, response.token);
          setVideoClient(client);
        } catch (error) {
          console.error('Error initializing Stream client:', error);
        } finally {
          setIsConnecting(false);
        }
      };

      initClient();

      return () => {
        if (videoClient) {
          videoClient.disconnectUser();
          setVideoClient(undefined);
        }
      };
    }, [user, isLoaded, apiKey]);
    if(!videoClient) return <Loader />;
    return (
      <StreamVideo client={videoClient}>
       {children}
      </StreamVideo>
    );
  };

  export default StreamVideoProviders;