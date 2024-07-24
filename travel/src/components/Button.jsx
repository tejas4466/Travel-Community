import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button
            type={type}
            className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
            {...props}
        >
            {children}
        </button>
    );
}
