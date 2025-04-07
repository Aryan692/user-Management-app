import Link from 'next/link'
import React from 'react'

function page() {
  return (

    
   <div className='flex items-center justify-center border h-screen max-w-full'>
    <div className=' flex items-center justify-center'>
     <Link href="/create-user">  <h1 className='text-5xl font-bold text-red-600'>Click here to create user</h1> </Link>
    </div>
    </div>
 
   
  )
}

export default page




