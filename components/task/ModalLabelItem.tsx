

const ModalLabelItem = ({className,onDelete}: {className: string,onDelete: () => void}) => {
    return (
        <div className={`${className} rounded-lg p-1`}>
            <div onClick={onDelete} className='py-2 border-t-2 border-gray-200 px-2 menu-hover'><i className="fa-solid fa-trash"></i></div>
        </div>
    );
};

export default ModalLabelItem;