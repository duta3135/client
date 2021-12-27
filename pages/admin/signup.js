import React from 'react'
import styles from '../../styles/SignUp.module.css'
import { useForm } from "react-hook-form";
import axios from 'axios'
function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm();
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
            alert('naw')
        }
    };
    return (
        <div className={styles.wrapper}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Name</label>
                <input type="text" placeholder='bejo'{...register("name", {required: true})} />
                <label>username</label>
                <input type="text" placeholder='bejo315'{...register("username", {required: true})} />
                <label>Password</label>
                <input type="password"{...register("password", { required: true })} />
                <label>Confirm Password</label>
                <input type="password" {...register("confirmPassword", { required: true })} />
                <label>instagram url</label>
                <input type="url" {...register("insta", { required: true })} />
                <button type="submit">Sign-up</button>
            </form>
        </div>
    )
}

export default Signup
