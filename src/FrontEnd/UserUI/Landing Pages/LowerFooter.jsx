import React from 'react'

function LowerFooter() {
    return (
        <>
            <div className='bg-gray-800 '>
                <div className=' text-white grid grid-cols-3 gap-4 px-10 pl-40 pr-80 py-10'>
                    <div>
                        <h1 className='font-semibold text-'>About Shiksha</h1>
                        <ul className='text-xs [&>li]:pt-1'>
                            <li>About Us</li>
                            <li>Management Team</li>
                            <li>Careers</li>
                            <li>Shiksha Authors</li>
                            <li>FAQs</li>
                            <li>Contact Us</li>

                        </ul>
                    </div>



                    <div>
                        <h1 className='font-semibold text-'>Our Group</h1>
                        <ul className='text-xs [&>li]:pt-1'>
                            <li>About Us</li>
                            <li>Management Team</li>
                            <li>Careers</li>
                            <li>Shiksha Authors</li>
                            <li>FAQs</li>
                            <li>Contact Us</li>
                            <li>Shiksha Authors</li>
                            <li>FAQs</li>
                            <li>Contact Us</li>

                        </ul>
                    </div>

                    <div>
                        <h1 className='font-semibold text-'>About Shiksha</h1>
                        <ul className='text-xs [&>li]:pt-1'>
                            <li>About Us</li>
                            <li>Management Team</li>
                            <li>Careers</li>
                            

                        </ul>
                    </div>
                </div>
                {/* <div className=' bg-blue-200'></div> */}
            </div>
        </>
    )
}

export default LowerFooter