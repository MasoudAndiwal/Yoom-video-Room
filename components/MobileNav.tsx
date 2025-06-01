'use client'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from 'react'
import { SidebarLinks } from "../constants"
import { cn } from "@/lib/utils"

function MobileNav() {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <section className="w-full max-w-[246px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src='/icons/hamburger.svg'
            width={36}
            height={36}
            alt="Menu"
            className="cursor-pointer sm:hidden"
          />
        </SheetTrigger>

        <SheetContent side='left' className="border-none bg-[#1C1F2E]">
          {/* 👇 Add a hidden accessible title */}
          <SheetHeader>
            <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
          </SheetHeader>

          <Link href='/' className='flex items-center gap-1 mt-4'>
            <Image
              src='/icons/logo.svg'
              width={32}
              height={32}
              alt='Yoom logo'
              className='max-sm:size-10'
            />
            <p className='text-[26px] font-extrabold text-white max-sm:hidden'>
              Yoom
            </p>
          </Link>

          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-auto">
            <SheetClose asChild>
              <section className="flex h-full flex-col gap-6 pt-16 text-white">
                {SidebarLinks.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        'flex gap-4 items-center p-4 ',
                        isActive ? 'bg-[#0E78F9]  rounded-[8px] text-white' : 'text-gray-400'
                      )}
                    >
                      <Image
                        src={link.icon}
                        alt={link.name}
                        width={24}
                        height={24}
                      />
                      <span className="hidden max-sm:block">{link.name}</span>
                    </Link>
                  )
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}

export default MobileNav
