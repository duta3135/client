import React from 'react'
import styles from '../../styles/SignUp.module.css'
import { useForm } from "react-hook-form";
function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data =>{
        if(data.password === data.confirmPassword){
            alert('yas')
        }
        else{
            alert('naw')
        }
    };
    return (
        <div className={styles.wrapper}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Name</label>
                <input type="text" {...register("name", {required: true})} />
                <label>username</label>
                <input type="text" {...register("username", {required: true})} />
                <label>Password</label>
                <input type="password"{...register("password", { required: true })} />
                <label>Confirm Password</label>
                <input type="password" {...register("confirmPassword", { required: true })} />
                <button type="submit">Sign-up</button>
            </form>
        </div>
    )
}

export default Signup
