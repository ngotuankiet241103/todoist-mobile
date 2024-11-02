import React from 'react';
import useOpenModal from '../../hooks/useOpenModal';
type BaseShowLabel = {title: string,children: React.ReactNode,onClick: () => void}
const BaseShowLabel = ({title,children,onClick}:BaseShowLabel ) => {
    const {isShow,handleToggleModel} = useOpenModal(true);
    return (
        <div>
            <div className='flex justify-between'>
                <div className='flex gap-2 font-semibold items-center'>
                    <span className='text-[14px]' onClick={handleToggleModel}>
                        <i className="fa-solid fa-chevron-down"></i>
                    </span>
                    <span className='text-[14px]'>
                        {title}
                    </span>
                </div>
                <span className='text-[14px]' onClick={onClick}><i className="fa-solid fa-plus"></i></span>
            </div>
            {isShow && children}
        </div>
    );
};

export default BaseShowLabel;