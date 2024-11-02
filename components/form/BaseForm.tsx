
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Input from "./Input"
import ErrorNoti from "./ErrorNoti"
import Button from "./Button"
import FormInput from "./FormInput"
import Label from "./Label"
export type FormData ={
    email: string 
    password: string,
    
}
type Inputs =  FormData

const schema  = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
    
})
type Form = {
    isSubmitting: boolean,
    onclick: (value: FormData) => Promise<void>
}
const BaseForm = ({isSubmitting,onclick}: Form) => {
    console.log(isSubmitting);
    
    const {control, handleSubmit,formState: { errors }} = useForm<Inputs>({
        resolver: yupResolver<Inputs>(schema)
    })
    const onSubmit = onclick;
    
    return (
        <div className=''>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-10">
                    <FormInput>
                        <Label htmlfor="email" className="absolute top-0 left-0 px-2 py-1 text-[14px]">Email</Label>
                        <Input classNames="border-none outline-none py-0 px-0" placehol="Enter your email" control={control} name="email"  typeinput="text" ></Input>
                    </FormInput>
                    {errors.email && <ErrorNoti message={errors.email?.message}></ErrorNoti>}
                </div>
                <div className="mb-10 ">
                    <FormInput>
                        <Label htmlfor="password" className="absolute top-0 left-0 px-2 py-1 text-[14px] ">Password</Label>
                        <Input classNames="border-none outline-none py-0 px-0" placehol="Enter your password" control={control} name="password"  typeinput="password"></Input>
                    </FormInput>
                    {errors.password && <ErrorNoti message={errors.password?.message}></ErrorNoti>}
                </div>
                <Button isSubmit={isSubmitting} classNames="bg-primary w-full px-4 py-2 rounded-lg text-[18px] hover:bg-red-600 font-semibold text-white"  content="Log in"></Button>
            </form>
        </div>
    );
};

export default BaseForm;