
import React from 'react'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidbar'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Yoom",
  description: "Video calling app",
  icons:{
    icon:'/icons/logo.svg'
  }
};
function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className='relative'>
            <Navbar />
        <div className='flex'>
            <Sidebar />
            <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-24 sm:pb-14 md:pb-16'>
                <div className=' w-full'>
                    {children}
                </div>
            </section>
            
            </div>
            </main>
    )
}

export default HomeLayout