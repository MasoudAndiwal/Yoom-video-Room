import React from 'react'
import { SignUp } from "@clerk/nextjs";

function SignUpPage() {
  return (
    <main className='flex h-screen items-center justify-center'>
        <SignUp />
    </main>
  )
}

export default SignUpPage