import React from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import Head from "next/head"
import Link from "next/link"
import {useCookies} from "react-cookie"
import { useRouter } from 'next/router'

import styles from '../../styles/LogIn.module.css'
function Login() {
    const { register, handleSubmit, formState: { errors }} = useForm();
    const [cookie, setCookie]=useCookies(["user"])
    const router = useRouter()

    async function authenticate(data){
        axios.post(`${process.env.API_URL}/verify`, {
            username: data.username,
            password: data.password
        })
        .then(res=> {
            if(res.data.isVerified){
                setCookie("tcm_user", res.data.token,{
                    path: "/",
                    sameSite: true,
                    maxAge: parseInt(2**53 - 1)
                })
                router.push('/admin')
            }
            else{
                alert('login failed')
            }
        })
    }
    return (
        <div className={styles.wrapper}>
            <Head>
                <title>Log-in</title>
            </Head>
            <form onSubmit={handleSubmit(authenticate)}>
                <label>Username</label>
                <input placeholder="johndoe95" type="text" {...register("username", {required:true})}/>
                {errors.username && <span>*username required</span>}
                <label>Password</label>
                <input type="password" {...register("password", {required:true})}/>
                {errors.username && <span>*password required</span>}
                <button type='submit'>Log in</button>
                <div>
                    Don't have an account? <Link href='/admin/signup'>Sign-up</Link>
                </div>
            </form> 
        </div>
    )
}

export default Login