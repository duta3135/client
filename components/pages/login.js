import React from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import Head from "next/head"
import Link from "next/link"

import styles from '../../styles/LogIn.module.css'
function Login() {
    const { register, handleSubmit, formState: { errors } , getValues} = useForm();
    async function authenticate(data){
        axios.get(`http://localhost:3001/writers/${data.username}`)
        .then(res=> console.log(res))
    }
    return (
        <div className={styles.wrapper}>
            <Head>
                <title>Log-in</title>
            </Head>
            <form onSubmit={handleSubmit(authenticate)}>
                <label>Username</label>
                <input placeholder="johndoe95" type="text" {...register("username", {required:true})}/>
                <label>Password</label>
                <input type="password" {...register("password", {required:true})}/>
                <button type='submit'>Log in</button>
                <div>
                    Don't have an account? <Link href='/admin/signup'>Sign-up</Link>
                </div>
            </form> 
        </div>
    )
}

export default Login