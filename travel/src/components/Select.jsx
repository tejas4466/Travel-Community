import React from 'react';
import { useId } from 'react';

const Select = React.forwardRef(({
    options,
    label,
    className = "",
    ...props
}, ref) => {
    const id = useId();

    return (
        <div>
            {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>}
            <select
                {...props}
                id={id}
                ref={ref}
                className={`${className} mt-1 block w-full px-3 py-2 border border-gray-300  rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500  sm:text-sm`}
            >
                {options?.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
});

export default Select;
