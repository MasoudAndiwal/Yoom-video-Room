"use server"

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export async function generateStreamToken() {
    try {
        const user = await currentUser();
        
        if (!user) {
            throw new Error('User not authenticated');
        }
        
        if (!apiKey || !apiSecret) {
            throw new Error('Stream API credentials are not properly configured');
        }

        const streamClient = new StreamClient(apiKey, apiSecret);
        // expier date of token
        const expirationTime = Math.floor(Date.now() / 1000) + 7200;

        const token = streamClient.createToken(user.id, expirationTime);

        return {
            token,
            user:{
                id:user.id,
                name:user.username || user.id,
                image:user.imageUrl,
            }
        };
         
            
        

    } catch (error) {
        console.error('Error generating stream token:', error);
        throw error;
    }
}
