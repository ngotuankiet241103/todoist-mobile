
const ErrorNoti = ({message } : {message:string | undefined}) => {
    return (
    
       <span className='text-red-500 block px-2'>{message}</span>
    );
};

export default ErrorNoti;