import EditorSidebar from "../../../components/EditorSidebar"
import styles from "../../../styles/ArticleEditor.module.css"
import SplitActionBtn from "../../../components/SplitActionBtn"
import { useState , useEffect} from "react"
import dynamic from 'next/dynamic'
import axios from 'axios'
import { useCookies } from "react-cookie";

const NoSSREditor = dynamic(()=> import('../../../components/TextEditor'), {ssr: false})
function ArticleEditor({writers}) {
    const [cookies, setCookie] = useCookies();    
    const [uploadStatus, setUploadStatus] = useState({isUploaded: false, url: ''})
    const [formState, setFormState] = useState({})
    const [textEditorState, setTextEditorState] = useState({})
    async function publish(published){
        var key = cookies.key
        const document = {
            cover: uploadStatus.url,
            title: formState.title,
            writer: formState.writers,
            description: formState.description,
            category: formState.category,
            content: textEditorState,
            published
        }
            console.log(key)
        
    }
    return (
        <div className={styles.wrapper}>
            <EditorSidebar writers={writers} setFormState={setFormState}/>
            <header className={styles.header}>
                <SplitActionBtn publish={publish}/>
            </header>
            
            <main className={styles.main}>
                <NoSSREditor setTextEditorState={setTextEditorState}/>
            </main>
        </div>
    )
}
export async function getServerSideProps()
{
    try {
        const res = await axios.get('http://localhost:3001/writers')
        const writers = res.data
        return{
            props: {writers}
        }
    } catch (err) {
        console.log(err)
    }
}
export default ArticleEditor
