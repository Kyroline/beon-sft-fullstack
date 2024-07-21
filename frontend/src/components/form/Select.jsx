const Select = ({ className, options, label, placeholder, value, onChange, required }) => {
    return (
        <div className={className + " flex flex-col"}>
            {label ?
                <label htmlFor="" className='font-semibold mb-2'>{label}{required ? <span className="text-red-600">*</span> : ''}</label>
                : null}
            <select value={value} onChange={onChange} required={required} id="countries" class="bg-gray-50 border border-gray-400 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2">
                <option selected={true} value={''}>{placeholder}</option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>{option.text}</option>
                ))}
            </select>
        </div>
    )
}

export default Select