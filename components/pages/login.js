import React from 'react'
import {useForm} from 'react-hook-form'
import styles from '../../styles/LogIn.module.css'
function Login() {
    const { register, handleSubmit, formState: { errors } , getValues} = useForm();
    async function authenticate(data){
        console.log(data)
    }
    return (
        <div className={styles.wrapper}>
            <form onSubmit={handleSubmit(authenticate)}>
                <input placeholder="johndoe95" type="text" {...register("username", {required:true})}/>
                <input type="password" {...register("password", {required:true})}/>
                <button type='submit'>Log in</button>
            </form> 
        </div>
    )
}

export default Login