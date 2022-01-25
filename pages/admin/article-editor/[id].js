import EditorSidebar from "../../../components/EditorSidebar"
import styles from "../../../styles/ArticleEditor.module.css"
import SplitActionBtn from "../../../components/SplitActionBtn"
import { useState , useEffect} from "react"
import dynamic from 'next/dynamic'
import axios from 'axios'
import Login from '../../../components/pages/login'
import Head from "next/head"

import { parseCookies } from '../../../helpers/parseCookies'

const NoSSREditor = dynamic(()=> import('../../../components/TextEditor'), {ssr: false})
function ArticleEditor({cookies, writers, article}) {
    const [uploadStatus, setUploadStatus] = useState({isUploaded: true, url: article.cover, id: ''})
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
            content: textEditorState,
            published: published
        }
        axios.post("http://localhost:3001/articles", document).then(res=>{
            console.log(res)
        })
        }
        catch(err){
            console.error(err)
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
                    <SplitActionBtn publish={publish}/>
                </header>
                
                <main className={styles.main}>
                    <NoSSREditor setTextEditorState={setTextEditorState} initialState={article.content}/>
                </main>
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
