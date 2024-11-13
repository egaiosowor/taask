import React from 'react'

function Pill({ name }) {

    return (
        <div
            className={`${name === 'To-do' ? 'font-bold text-white bg-black' : 'text-gray-500 bg-gray-100'} px-2 py-1 rounded-md`}
        >{name}
        </div>
    )
}

export default Pill