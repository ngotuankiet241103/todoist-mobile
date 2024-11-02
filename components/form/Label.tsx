import React from 'react';
type Label = {
    className: string,
    htmlfor: string,
    children: React.ReactNode | string
}
const Label = ({className,htmlfor,children}:Label) => {
    return (
        <label htmlFor={htmlfor} className={`${className}`}>{children}</label>
    );
};

export default Label;