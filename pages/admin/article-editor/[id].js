import EditorSidebar from "../../../components/EditorSidebar"
import styles from "../../../styles/ArticleEditor.module.css"
import DynamicSplitBtn from "../../../components/DynamicSplitBtn"
import { useState} from "react"
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import axios from 'axios'
import Modal from "../../../components/Modal"
import Login from '../../../components/pages/login'
import Head from "next/head"

import { parseCookies } from '../../../helpers/parseCookies'

const NoSSREditor = dynamic(()=> import('../../../components/TextEditor'), {ssr: false})
function ArticleEditor({cookies, writers, article}) {
    const [uploadStatus, setUploadStatus] = useState({isUploaded: true, url: article.cover, id: ''})
    const router = useRouter()

    const [modalState, setModalState] = useState({
        text: '',
        mainAction: console.log(),
        show: false
    });
    const [formState, setFormState] = useState({
        title: article.title,
        writers: article.writers,
        description: article.description,
        category: article.category
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
        axios.post("http://localhost:3001/articles", document).then(res=>{
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
            console.error(err)
        }
    }
    async function update(published){
        if(article.content==JSON.stringify(textEditorState)) {alert('no changes made')}
        else{
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
            axios.patch(`http://localhost:3001/articles/${article._id}`, document)
            .then(res=>{
                setModalState({
                    text: "updated",
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
        }}
    }
    if(cookies){
        return (
            <div className={styles.wrapper}>
                <Head>
                    <title>{article.title}</title>
                </Head>
                <EditorSidebar 
                    writers={writers} 
                    setFormState={setFormState} 
                    formState={formState}
                    uploadStatus={uploadStatus} 
                    setUploadStatus={setUploadStatus}/>
                <header className={styles.header}>
                    <DynamicSplitBtn isPublished={article.published} publish={publish} update={update} setModalState={setModalState} title={formState.title}/>
                </header>
                
                <main className={styles.main}>
                    <NoSSREditor setTextEditorState={setTextEditorState} initialState={article.content}/>
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


ArticleEditor.getInitialProps = async ({req, query}) =>{
    const cookies = parseCookies(req)
    const res = await axios.get('http://localhost:3001/writers')
    const fetchArticle = await axios.get(`http://localhost:3001/articles/${query.id}`)
    const writers = res.data
    return {
        cookies: cookies.tcm_user,
        writers: writers,
        article: fetchArticle.data
    }
}
export default ArticleEditor
