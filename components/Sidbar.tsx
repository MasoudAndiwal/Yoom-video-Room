'use client'
import { usePathname } from 'next/navigation'
import React from 'react'
import { SidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

function Sidbar() {
  const pathname = usePathname();
  return (
    <section className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-[#1C1F2E] p-6 pt-28 text-white max-sm:hidden lg:w-[264px] '>
        <div className='flex flex-col gap-6'>
            {
                SidebarLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                        href={link.href}
                        key={link.name}
                        className={cn('flex gap-4 items-center p-4 rounded-lg justify-start ' , {'bg-[#0E78F9] rounded-[8px]': isActive})}
                        >
                        <Image
                        src={link.icon}
                        alt={link.name}
                        width={24}
                        height={24}
                        />
                        <p className='text-lg font-semibold max-lg:hidden'>{link.name}</p>
                        </Link>
                    )
                })
            }
        </div>
    </section>
  )
}

export default Sidbar