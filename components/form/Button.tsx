type Button = {
    classNames: string | undefined,
    content: string,
    isSubmit: boolean
    onclick?: () => Promise<void>
}
const Button = (props : Button) => {
    const {classNames,content,isSubmit,onclick} = props;
    return (
        <button className={`${classNames}`} onClick={onclick}>
            {isSubmit ? "Loading..." : `${content}`}
            
        </button>
    );
};

export default Button;