import EditorSidebar from "../../../components/EditorSidebar"
import styles from "../../../styles/ArticleEditor.module.css"
import SplitActionBtn from "../../../components/SplitActionBtn"
import TextEditor from '../../../components/TextEditor'
function ArticleEditor() {

    return (
        <div className={styles.wrapper}>
            <EditorSidebar/>
            <header className={styles.header}><SplitActionBtn/></header>
            
            <main className={styles.main}>
                <TextEditor/>
            </main>
        </div>
    )
}

export default ArticleEditor
