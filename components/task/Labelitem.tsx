import React from 'react';
import { NavLink } from 'react-router-dom';

const Labelitem = ({name,code} : {name: string,code:string}) => {
    return (
        <NavLink to={`/app/label/${code}`} >
            <div className='flex gap-2'>
                <span><i className="fa-solid fa-tag"></i></span>
                <span>{name}</span>
            </div>
        </NavLink>
    );
};

export default Labelitem;