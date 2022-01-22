import React from 'react'
import styles from '../../styles/SignUp.module.css'
import { useForm } from "react-hook-form";
import axios from 'axios'
import Head from "next/head"
import Link from 'next/link'
import {useCookies} from "react-cookie"
import { useRouter } from 'next/router'
function Signup() {
    const { register, handleSubmit, formState: { errors } , getValues} = useForm();
    const [cookie, setCookie]=useCookies(["user"])
    const router = useRouter()
    async function onSubmit(data){
        if(data.password === data.confirmPassword){
            try {
                axios.post('http://localhost:3001/writers', {
                    username: data.username,
                    name: data.name,
                    password: data.password,
                    insta: data.insta
                })
                .then(result=>{
                    setCookie("tcm_user", JSON.stringify(result),{
                        path: "/",
                        sameSite: true,
                        maxAge: parseInt(2**53 - 1)
                    }),
                    router.push('/admin')}
                )  
            } catch (err) {
                alert('failed to sign you up')
                console.error(err)
            }
        }
        else{
            return        
        }
    };
    const passwordMatched = getValues().password === getValues().confirmPassword ? <span></span> : <span>passwords dont match</span>
    return (
        <div className={styles.wrapper}>
            <Head>
                <title>Sign-Up</title>
            </Head>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Name</label>
                <input type="text" placeholder='bejo'{...register("name", {required: true})} />
                {errors.name && <span>*name required</span>}
                <label>username</label>
                <input type="text" placeholder='bejo315'{...register("username", {required: true})} />
                {errors.username && <span>*username required</span>}

                <label>Password</label>
                <input type="password"{...register("password", { required: true })} />
                {errors.password && <span>*password required</span>}
                <label>Confirm Password</label>
                <input type="password" {...register("confirmPassword", { required: true })} />
                {passwordMatched}
                <label>instagram url</label>
                <input type="url" {...register("insta", { required: true })} />
                {errors.insta && <span>*url required</span>}

                <button type="submit">Sign-up</button>
                <div>
                    Already have an account? <Link href='/admin'>Log-in</Link>
                </div>
            </form>
        </div>
    )
}

export default Signup
