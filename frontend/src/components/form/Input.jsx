import React from 'react'

const Input = ({ label, type, value, onChange, readOnly, required }) => {
    return (
        <div className='flex flex-col'>
            {label ? <label className='font-semibold mb-1'>{label}{required ? <span className="text-red-600">*</span> : ''}</label> : null}
            <input
                required={required}
                className={`font-[Montserrat] p-2 rounded-md bg-gray-50 border border-gray-400 text-black focus:border-blue-600 outline-none transition-colors ${readOnly ? 'pointer-events-none' : null}`}
                type={type}
                value={value}
                onChange={onChange} 
                readOnly={readOnly ?? false}/>
        </div>
    )
}

export default Input