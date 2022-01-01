import styles from '../styles/EditorSidebar.module.css'
import { useForm } from "react-hook-form";
function Option({data}){
    const value = {
        name: data.name,
        insta: data.insta
    }
    return <option key={data.id} value={value}>{data.name}</option>
}

export default function EditorSidebar({writers}){
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
                    {writers.map((writer)=><Option key={writer.id} data={writer}/>)}
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