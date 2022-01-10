import EditorSidebar from "../../../components/EditorSidebar"
import styles from "../../../styles/ArticleEditor.module.css"
import SplitActionBtn from "../../../components/SplitActionBtn"
import { useState , useEffect} from "react"
import dynamic from 'next/dynamic'
import axios from 'axios'

const NoSSREditor = dynamic(()=> import('../../../components/TextEditor'), {ssr: false})
function ArticleEditor({writers}) {
    
    const [formState, setFormState] = useState({})
    const [textEditorState, setTextEditorState] = useState({})
    useEffect(() => {
        console.log(textEditorState)
    }, [textEditorState])
    return (
        <div className={styles.wrapper}>
            <EditorSidebar writers={writers} setFormState={setFormState}/>
            <header className={styles.header}><SplitActionBtn/></header>
            
            <main className={styles.main}>
                <NoSSREditor setTextState={setTextEditorState}/>
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
