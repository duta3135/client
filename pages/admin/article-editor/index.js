import EditorSidebar from "../../../components/EditorSidebar"
import styles from "../../../styles/ArticleEditor.module.css"
import SplitActionBtn from "../../../components/SplitActionBtn"
import { useState , useEffect} from "react"
import dynamic from 'next/dynamic'
import axios from 'axios'
import { parseCookies } from '../../../helpers/parseCookies'

const NoSSREditor = dynamic(()=> import('../../../components/TextEditor'), {ssr: false})
function ArticleEditor({cookies, writers}) {
    console.log(cookies)
    const [uploadStatus, setUploadStatus] = useState({isUploaded: false, url: ''})
    const [formState, setFormState] = useState({})
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
    return (
        <div className={styles.wrapper}>
            <EditorSidebar 
                writers={writers} 
                setFormState={setFormState} 
                uploadStatus={uploadStatus} 
                setUploadStatus={setUploadStatus}/>
            <header className={styles.header}>
                <SplitActionBtn publish={publish}/>
            </header>
            
            <main className={styles.main}>
                <NoSSREditor setTextEditorState={setTextEditorState}/>
            </main>
        </div>
    )
}
// export async function getServerSideProps()
// {
//     try {
//         const res = await axios.get('http://localhost:3001/writers')
//         const writers = res.data
//         return{
//             props: {writers}
//         }
//     } catch (err) {
//         console.log(err)
//     }
// }
ArticleEditor.getInitialProps = async ({req}) =>{
    const cookies = parseCookies(req)
    const res = await axios.get('http://localhost:3001/writers')
    const writers = res.data
    return {
        cookies: cookies.user,
        writers: writers
    }
}
export default ArticleEditor
