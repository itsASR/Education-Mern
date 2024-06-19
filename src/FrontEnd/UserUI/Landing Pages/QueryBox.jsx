import React from 'react'

function QueryBox() {
    return (
        <>
            <div className='bg-[#2A2A2A] px-56 py-5'>
                <p className='text-white font-semibold'>Get our experts to answer your questions within 24 Hrs</p>
                <div className='w-full flex '>
                    <input type='text' placeholder='search here' className='w-full px-2 text-black' />
                    <button className='py-2 px-4 text-white font-semibold text-sm text-nowrap bg-orange-400 border-8 border-white'>Ask Questions</button>
                </div>
            </div>
        </>
    )
}

export default QueryBox