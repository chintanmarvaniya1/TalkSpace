import React, { useId } from 'react'

function InputField({ label, type,name, placeholder, value, handleOnChange, className },ref) {
    const id = useId();
    return (
        <div className='flex flex-col gap-1'>
            {label && <label htmlFor={id}>{label}</label>}
            
            {
                <input
                    type={type}
                    id={id}
                    ref={ref}
                    name={name}
                    placeholder={placeholder}
                    className={`bg-slate-100 px-2 py-1 focus:outline-primary ${className}`}
                    value={value}
                    onChange={handleOnChange}
                    required
                />
            }
            
        </div>
    )
}

export default React.forwardRef(InputField);