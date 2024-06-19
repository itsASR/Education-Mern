import React from 'react'

function RedirectModel() {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative transform transition-all duration-300 ease-in-out">
                <button  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                    &times;
                </button>
                <img src='https://tradebrains.in/wp-content/uploads/2021/09/shiksha.png' className='w-40 mx-auto mb-4' alt="Logo" />
                <h2 className="text-2xl text-black font-bold mb-4 text-center">
                    Registered Successful 
                </h2>
               
                <p className="mt-2  text-center cursor-pointer px-4 py-2 bg-purple-500 hover:underline">
                   Login Now
                </p>
            </div>
        </div>
    )
}

export default RedirectModel