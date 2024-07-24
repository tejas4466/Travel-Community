import React from 'react';
import { useId } from 'react';
import { useSelector } from 'react-redux';

const Input = React.forwardRef(({
    label,
    type = "text",
    className = "",
    ...props
}, ref) => {

    const id = useId();
    const user=useSelector(state=>state.auth.userDat)

    return (
        <div className="w-full">
            {label &&
                <label
                    htmlFor={id}
                    className={`block text-sm font-medium {user?'text-black':'text-white'}`}
                >
                    {label}
                </label>}
            <input
                type={type}
                className={`${className} mt-1 block w-full px-3 py-2 border border-gray-300  rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm`}
                id={id}
                ref={ref}
                {...props}
            />
        </div>
    );
});

export default Input;
