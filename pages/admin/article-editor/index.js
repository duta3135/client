import EditorSidebar from "../../../components/EditorSidebar"
import styles from "../../../styles/ArticleEditor.module.css"
import SplitActionBtn from "../../../components/SplitActionBtn"
function ArticleEditor() {

    return (
        <div className={styles.wrapper}>
            <EditorSidebar/>
            <header><SplitActionBtn/></header>
            
            <main>
                
            </main>
        </div>
    )
}

export default ArticleEditor
