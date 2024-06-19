import React from 'react';

function Hero() {
    return (
        <div className='   h-96 w-full bg-[url("https://images.shiksha.com/mediadata/images/1715835973phpqWtEI9.jpeg")] bg-no-repeat bg-cover'>
            <div className='pb-10 h-full bg-gradient-to-t from-[#0000009f] to-[#ffffff00]'>
                <div className='h-full flex items-end justify-center '>
                    <div className='px-10 py-5  bg-gray-900 bg-opacity-70 mb-10 text-white font-bold flex flex-col justify-center items-center'>
                        <p className='text-center  '>Find Colleges, Courses & Exams that are Best for You!</p>
                        <p className='text-center'>61,000+ Colleges | 3,95,000+ Courses | 4,95,000+ Reviews | 950+ Exams</p>

                        <div className='w-full flex pt-5'>
                            <input type='text' placeholder='search here' className='w-full px-2 text-black' />
                            <button className='py-2 px-8 bg-orange-400'>Search</button>
                        </div>
                    </div>
                </div>
                <p className='text-center text-white '>Mohan Babu University, Tirupati<span className='text-sm'>(view details)</span></p>
            </div>
        </div>
    );
}

export default Hero;
