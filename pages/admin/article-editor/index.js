import EditorSidebar from "../../../components/EditorSidebar"
import styles from "../../../styles/ArticleEditor.module.css"
import SplitActionBtn from "../../../components/SplitActionBtn"
import dynamic from 'next/dynamic'
const NoSSREditor = dynamic(()=> import('../../../components/TextEditor'), {ssr: false})
function ArticleEditor() {

    return (
        <div className={styles.wrapper}>
            <EditorSidebar/>
            <header className={styles.header}><SplitActionBtn/></header>
            
            <main className={styles.main}>
                <NoSSREditor/>
            </main>
        </div>
    )
}

export default ArticleEditor
