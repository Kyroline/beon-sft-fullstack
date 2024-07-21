import { ImInsertTemplate } from "react-icons/im"

const RadioButtons = ({ value, label, options, horizontal, onSelect, required, name }) => {
    return (
        <fieldset>
            <legend class="sr-only">
                Countries
            </legend>

            {label ? <label className='font-semibold mb-2'>{label}{required ? <span className="text-red-600">*</span> : ''}</label> : null}
            <div className={'mt-2' + horizontal ? 'flex flex-row' : ''}>
                {options.map((item, index) => (
                    <div key={index} className={`flex items-center ${horizontal ? 'mb-2' : 'mb-4'} mr-2`}>
                        <input checked={value ? (value == item.value ? true : null) : null} required={required} type="radio" name={name} onChange={e => onSelect(e.target.value)} value={item.value} className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" />
                        <label className="text-sm font-medium text-gray-900 ml-2 block">{item.text}</label>
                    </div>
                ))}
            </div>

            {/* <div class="flex items-center">
                <input type="radio" name="countries" value="China" className="h-4 w-4 border-gray-200 focus:ring-2 focus:ring-blue-300" />
                <label className="text-sm font-medium text-gray-400 ml-2 block">
                    China (disabled)
                </label>
            </div> */}
        </fieldset>
    )
}

export default RadioButtons