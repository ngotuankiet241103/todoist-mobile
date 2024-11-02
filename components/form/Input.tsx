import React from 'react';
import { useController } from "react-hook-form";
type input = {
    typeinput: React.HTMLInputTypeAttribute | undefined,
    control: any,
    isCustom?: boolean,
    classNames?: string,
    defaultValue?: string,
    name: string,
    placehol: string

}
const Input = (props:input) => {
    const {control,defaultValue ="",classNames,typeinput,isCustom,...rest} = props;
    const {field} = useController({control,name: props.name,defaultValue: defaultValue || ""})
    return (
        <input placeholder={props.placehol} className={`transition-all border border-stone-400 rounded-lg w-full  outline-none ${isCustom && `bg-gray-300` } focus:bg-transparent focus:border-primary ${classNames}`} id={props.name} type={typeinput} {...field} {...rest} />
    );
};

export default Input;