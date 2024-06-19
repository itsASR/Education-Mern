import React, { useContext, useState } from 'react';
import { ContextData } from '../../../App';

function ChildCategory() {
    const { datas, parentdatas } = useContext(ContextData);
    const [subOption, setSubOption] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [showChild, setShowChild] = useState(false);

    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        const [index, value] = selectedValue.split('|');
        setSubOption(value);
        setSelectedIndex(parseInt(index, 10));
        setShowChild(true);
        console.log("Selected index:", index);
        console.log("Selected value:", value);
    };

    return (
        <div className='w-screen h-screen bg-red-500'>
            <div className='text-center m'>
                <select onChange={handleSelectChange}>
                    <option value="" disabled={showChild}>
                        Select a Grand category
                    </option>
                    {parentdatas.map((names, index) => (
                        <option key={index} value={`${index}|${names.GrandCategoryName}`}>
                            {names.GrandCategoryName}
                        </option>
                    ))}
                </select>
                <br />
                {showChild ? (
                    <select>
                        <option value="">Select a Parent Category</option>
                        {parentdatas[selectedIndex]?.ParentName.map((ee, i) => (
                            <option key={i}>{ee}</option>
                        ))}
                    </select>
                ) : (
                    <select>
                        <option value="">Select a Parent Category</option>
                    </select>
                )}
                <br />
                <input type='text' placeholder='Enter parent Category name' />
                <button className='bg-green-500 px-4 py-2'>Save</button>
            </div>
            <div className='bg-gray-400 container mx-auto flex justify-center flex-wrap gap-5 py-5 my-2'>
                <div className='border py-2 rounded-3xl border-black'>
                    <span className='px-2 py-2'>MBA</span>
                    <span className='bg-white rounded-full px-2'>X</span>
                </div>
            </div>
        </div>
    );
}

export default ChildCategory;
