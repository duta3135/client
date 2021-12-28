import styles from '../styles/EditorSidebar.module.css'
import { useForm } from "react-hook-form";
import axios from 'axios'
import { useEffect } from 'react';

export default function EditorSidebar(){
    useEffect(() => {
        axios.get('http://localhost:3001/writers')
        .then(result=>console.log(result))
    }, [])
    const dummyWriters = ['kang ux', 'kang backend', 'kang frontend', 'kang devOps', 'kang bakso']
    const segments = ['Entertainment', 'Health', 'Food', 'Politics']
    const { register, handleSubmit, formState: { errors } } = useForm();
    function onSubmit(data){
        console.log(data)
    }
    return(
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <label>Title</label>
                <input type="text" {...register('title', {required:true})}/>
                <label>Description</label>
                <input type='text' {...register('description', {required: true, maxLength:150})}/>
                <label>Writers</label>
                <select name='writers'{...register('writers', {required:true})} multiple>
                    {dummyWriters.map((writer)=>
                    //add key from writer id
                    <option key={writer} value={writer}>{writer}</option>)}
                </select>
                <label>Segment</label>
                <select name='segment' {...register('category', {required: true})}>
                    {segments.map((segment)=>
                    <option key={segment} value={segment}>{segment}</option>)}
                </select>
                <button type='submit'>okay</button>
            </form>
            
        </div>
    )
}