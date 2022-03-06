import EditorSidebar from "../../../components/EditorSidebar"
import styles from "../../../styles/ArticleEditor.module.css"
import SplitActionBtn from "../../../components/SplitActionBtn"
import { useState } from "react"
import dynamic from 'next/dynamic'
import axios from 'axios'
import Login from '../../../components/pages/login'
import Head from "next/head"
import { useRouter } from 'next/router'
import { parseCookies } from '../../../helpers/parseCookies'
import Modal from "../../../components/Modal"

const NoSSREditor = dynamic(()=> import('../../../components/TextEditor'), {ssr: false})
function ArticleEditor({cookies, writers}) {
    const [uploadStatus, setUploadStatus] = useState({isUploaded: false, url: '', id: ''})
    const router = useRouter()
    const headers={
        headers:{
            Authorization: cookies
        }
    }
    const [modalState, setModalState] = useState({
        text: '',
        mainAction: ()=>{},
        show: false
    });
    const [formState, setFormState] = useState({
        title: '',
        writers: [],
        description: '',
        category: ''
    })
    const [textEditorState, setTextEditorState] = useState({})
    async function publish(published){
        try{
            const document = {
            cover: uploadStatus.url,
            title: formState.title,
            writers: formState.writers,
            description: formState.description,
            category: formState.category,
            content: JSON.stringify(textEditorState),
            published: published
        }
        // console.log(document)
        axios.post(`${process.env.API_URL}/articles`, document, headers).then(res=>{
            setModalState({
                text: "posted",
                mainAction: ()=>{setModalState({
                    text: '',
                    mainAction: ()=>{},
                    show: false
                })
                router.push('/admin')
            },
                show: true
             })
        })
        }
        catch(err){
            alert(err)
        }
    }
    
    if(cookies){
        return (
            <div className={styles.wrapper}>
                <Head>
                    <title>Article Editor</title>
                </Head>
                <EditorSidebar 
                    writers={writers} 
                    setFormState={setFormState} 
                    formState={formState}
                    uploadStatus={uploadStatus} 
                    setUploadStatus={setUploadStatus}/>
                <header className={styles.header}>
                    <SplitActionBtn publish={publish} setModalState={setModalState} title={formState.title}/>
                </header>
                
                <main className={styles.main}>
                    <NoSSREditor setTextEditorState={setTextEditorState}/>
                </main>
                <Modal text={modalState.text} mainAction={modalState.mainAction} show={modalState.show} setModalState={setModalState}/>
            </div>
        )
    }
    else{
        return(
            <Login/>
        )
    }
}

ArticleEditor.getInitialProps = async ({req}) =>{
    const cookies = parseCookies(req)
    const res = await axios.get(`${process.env.API_URL}/writers`)
    const writers = res.data
    return {
        cookies: cookies.tcm_user,
        writers: writers
    }
}
export default ArticleEditor
