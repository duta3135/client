import EditorSidebar from "../../../components/EditorSidebar"
import styles from "../../../styles/ArticleEditor.module.css"
import SplitActionBtn from "../../../components/SplitActionBtn"
function ArticleEditor() {

    return (
        <div className={styles.wrapper}>
            <EditorSidebar/>
            <header className={styles.header}><SplitActionBtn/></header>
            
            <main className={styles.main}>
                main
            </main>
        </div>
    )
}

export default ArticleEditor
