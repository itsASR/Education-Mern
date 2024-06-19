import React, { useState } from 'react';

function CreateArticle() {
  const [elements, setElements] = useState([]); 

const addHeading = () => {
    setElements([...elements, { type: 'heading', content: 'New Heading', editing: false }]);
};

const addText = () => {
    setElements([...elements, { type: 'text', content: '' }]);
};



const toggleEditMode = (index) => {
    setElements(
        elements.map((element, i) =>
            i === index ? { ...element, editing: !element.editing } : element
        )
    );
};

const handleElementChange = (index, newContent) => {
    setElements(
        elements.map((element, i) =>
            i === index ? { ...element, content: newContent } : element
        )
    );
};

const applyFormat = (command) => {
    document.execCommand(command, false, null);
};


const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        applyFormat('insertLineBreak');
    }
};

return (
    <div className='max-w-4xl mx-auto px-4'>
        <input type='text' placeholder='Enter Title Here' className='border border-gray-300 rounded-md w-full p-2 my-4' />
        <div className='flex justify-between items-center mb-4'>
            <div>
                <button onClick={addHeading} className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2'>
                    Add Heading
                </button>
                <button onClick={addText} className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600'>
                    Add Text
                </button>
            </div>
            <div>
                <button onClick={() => applyFormat('bold')} className='bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 mr-2'>
                    Bold
                </button>
                <button onClick={() => applyFormat('italic')} className='bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 mr-2'>
                    Italic
                </button>
                <button onClick={() => applyFormat('underline')} className='bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 mr-2'>
                    Underline
                </button>

            </div>
        </div>
        <div id='Article-Section' className='bg-white rounded-md p-4'>
            {elements.map((element, index) => {
                return (
                    <div key={index} className='mb-4'>
                        <div className='flex items-center justify-between mb-2'>
                            {element.type === 'heading' ? (
                                element.editing ? (
                                    <input
                                        type='text'
                                        value={element.content}
                                        onChange={(e) => handleElementChange(index, e.target.value)}
                                        onBlur={() => toggleEditMode(index)}
                                        className='border-b border-gray-300 w-full p-2 outline-none'
                                        autoFocus
                                    />
                                ) : (
                                    <h2
                                        className='text-lg font-semibold cursor-pointer'
                                        onClick={() => toggleEditMode(index)}
                                    >
                                        {element.content}
                                    </h2>
                                )
                            ) : (
                                <div
                                    contentEditable
                                    suppressContentEditableWarning
                                    className='w-full border border-gray-300 p-2 rounded-md outline-none'
                                    placeholder='Start typing here...'
                                    onKeyPress={handleKeyPress}
                                    dangerouslySetInnerHTML={{ __html: element.content }}
                                    onChange={(e) => handleElementChange(index, e.target.innerHTML)}
                                />
                            )}
                            <button onClick={() => removeElement(index)} className='text-red-500 hover:text-red-600'>
                                Remove
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
);
}

export default CreateArticle;