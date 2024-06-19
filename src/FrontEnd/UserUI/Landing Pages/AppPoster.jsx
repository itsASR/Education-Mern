import React from 'react'
import app from '/appbanner.png'

function AppPoster() {
  return (
    <>
    <div className='bg-red-500 w-full '>
        <img src={app} className='w-full h-full object-cover'></img>
    </div>
    </>
  )
}

export default AppPoster