import StreamVideoProviders from '@/Providers/StreamClientProviders'
import { StreamVideoProvider } from '@stream-io/video-react-sdk'
import React from 'react'

function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <main>
        <StreamVideoProviders>
            {children}
        </StreamVideoProviders>
      </main>
    )
}

export default RootLayout