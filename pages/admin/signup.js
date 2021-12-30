import React from 'react'
import styles from '../../styles/SignUp.module.css'
import { useForm } from "react-hook-form";
import axios from 'axios'
function Signup() {
    const { register, handleSubmit, formState: { errors } , getValues} = useForm();
    const onSubmit = data =>{
        if(data.password === data.confirmPassword){
            
            axios.post('http://localhost:3001/writers', {
                username: data.username,
                name: data.name,
                password: data.password,
                insta: data.insta
            })
            .then(function (response) {
                console.log(response);
              })            
              .catch(function (error) {
                console.log(error);
              });
        }
        else{
            return        
        }
    };
    const passwordMatched = getValues().password === getValues().confirmPassword ? <span></span> : <span>passwords dont match</span>
    return (
        <div className={styles.wrapper}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Name</label>
                <input type="text" placeholder='bejo'{...register("name", {required: true})} />
                {errors.name && <span>*name required</span>}
                <label>username</label>
                <input type="text" placeholder='bejo315'{...register("username", {required: true})} />
                {errors.username && <span>*username required</span>}

                <label>Password</label>
                <input type="password"{...register("password", { required: true })} />
                {errors.username && <span>*password required</span>}
                <label>Confirm Password</label>
                <input type="password" {...register("confirmPassword", { required: true })} />
                {passwordMatched}
                <label>instagram url</label>
                <input type="url" {...register("insta", { required: true })} />
                {errors.username && <span>*url required</span>}

                <button type="submit">Sign-up</button>
            </form>
        </div>
    )
}

export default Signup
