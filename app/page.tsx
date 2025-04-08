import Link from 'next/link'
import React from 'react'

function page() {
  return (

    
   <div className='md:flex items-center justify-center border h-screen max-w-full'>
    <div className=' md:flex items-center justify-center'>
     <Link href="/create-user">  <h1 className=' text-2xl md:text-5xl font-bold text-red-600 hover:text-blue-600'>Click here to create user</h1> </Link>
    </div>
    </div>
 
   
  )
}

export default page




