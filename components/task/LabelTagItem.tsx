
import { useDispatch } from 'react-redux';
import { deleteMethod } from '../../helper/api';
import { Label, deleteLabel } from '../../redux/reducer/labelSlice';
import Labelitem from './Labelitem';
import ModalLabelItem from './ModalLabelItem';
type LabelTagItem = {
    label: Label;
    isBorder: boolean;
    innerref: (element: HTMLElement | null) => void;
    style: any;
    [key: string]: any;
  };
const LabelTagItem = ({label,innerref,style,isBorder,...props}: LabelTagItem) => {
    const dispatch = useDispatch();
    console.log(props);
    const handleRemoveLabel = (id: number) => {
        async function removeLabel<T>(api: string,data: T){
            try {
                const response = await deleteMethod(api,data);
                if(response && response.status){
                    dispatch(deleteLabel(response.data.id));
                    
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        removeLabel(`/labels/${id}`,{});
    }
    return (
        <div ref={innerref} style={style} {...props}>
            <div className={`flex px-1 py-1  justify-between border-y-2 ${isBorder ? '' : 'border-t-transparent'} border-gray-300`}>
                <Labelitem code={label.code} name={label.name}></Labelitem>
                <div className='flex gap-2 '>
                    <div className='relative modal-label'>
                        <span><i className="fa-solid fa-ellipsis"></i></span>
                        <ModalLabelItem onDelete={() => handleRemoveLabel(label.id)} className=' hidden box-calen absolute top-0 w-[200px] left-[-10px]  z-40 modal-label-item'></ModalLabelItem>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LabelTagItem;