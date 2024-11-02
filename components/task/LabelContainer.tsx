import { useRef, useState } from 'react';
import Label from '../form/Label';
import ButtonForm from '../button/ButtonForm';

const LabelContainer = ({clickCancle,clickSubmit}: {
    clickCancle: () => void;
    clickSubmit: (value: string) => void;
  }) => {
    const [isAllow,setAllow] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const handleOnChange = () => {
        if(inputRef.current && inputRef.current.value){
            setAllow(true);
        }
        else{
            setAllow(false);
        }
    }
    const handleAddLabel = () => {
        if(inputRef.current && inputRef.current.value){
            clickSubmit(inputRef.current.value);
        }
    }
    return (
        <div className='fixed inset-0 bg-[#0000006a] flex justify-center items-center'>
            <div className='rounded-lg bg-white p-2'>
                <span className='font-semibold mb-4 text-[18px]'>Add label</span>
                <div className='mb-2'>
                    <Label htmlfor="name" className=" text-[14px] font-semibold">Label name</Label>
                    <input ref={inputRef} onChange={handleOnChange} className='w-full border border-gray-400 rounded-lg px-1 ' type='text'/>
                </div>
                <ButtonForm clickSubmit={handleAddLabel} isAllow={isAllow} title="Add label" clickCancle={clickCancle}></ButtonForm>
            </div>
        </div>
    );
};

export default LabelContainer;