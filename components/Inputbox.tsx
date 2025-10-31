import React from "react"

export interface inputProps {
    id : string,
    label : string,
    placeholder : string,
    type : string,
    value : string,
    onChange : (e : React.ChangeEvent<HTMLInputElement>) => void
    required : boolean
}

export default function Inputbox({id, label, placeholder, type, value, onChange, required = false} : inputProps) {
    return <div className="flex flex-col space-y-2">
        <label htmlFor={id} className="text-lg font-semibold text-gray-300 dark:text-gray-800 pt-2">
            {label}
        </label>

        <input id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required = {required}
        className="border-solid border-2 border-gray-300 rounded-lg p-2 text-sm font-semibold bg-transparent dark:text-gray-800"
         />
    </div>
}