import React from 'react';

const FormInput = ({children} : {children: React.ReactNode}) => {
    return (
        <div className="relative px-2 py-1 border border-gray-300 rounded-md flex items-end h-[58px]">
            {children}
        </div>
    );
};

export default FormInput;