import styles from '../styles/EditorSidebar.module.css'
import { useForm } from "react-hook-form";
import axios from 'axios'
import {useState} from 'react'


export default function EditorSidebar({writers, setFormState, uploadStatus, setUploadStatus}){
    const segments = ['Entertainment', 'Health', 'Food', 'Politics']
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [selectedFile, setSelectedFile] = useState(null);

    function onSubmit(data){
        setFormState(data)
    }
    function resetImage(){
        
        setUploadStatus({isUploaded:false, url: ''})
        setSelectedFile(null)
    }
    function onFileUpload (e){
        e.preventDefault()
        const formData = new FormData()
        formData.append("image", selectedFile);
        if(formData){
            try {
          axios.post('http://localhost:3001/images', formData).then(res=>setUploadStatus({isUploaded:true, url: res.data.message.url}))
        } catch (err) {
          console.log(err)
        }
        }else{
            return
        }
        
      }
      const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
      }
      
      const input = uploadStatus.isUploaded ?
        <div className={styles.imageContainer}>
            <button onClick={()=>resetImage()}>x</button>
            <img className='image' src={uploadStatus.url} ></img>
        </div> 
         :
        <div className={styles.inputFile}>
            <input onChange={handleFileSelect} type="file"></input>
            <button type="submit">upload</button>
        </div>
    return(
        <div className={styles.container}>
            <form onSubmit={onFileUpload} >
                {input}
            </form>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <label>Title</label>
                <input type="text" {...register('title', {required:true})}/>
                <label>Description</label>
                <input type='text' {...register('description', {required: true, maxLength:150})}/>
                <label>Writers</label>
                <select name='writers'{...register('writers', {required:true})} multiple>
                    {writers.map((writer)=>(
                    <option key={writer.id} value={writer.name}>{writer.name}</option>))}
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