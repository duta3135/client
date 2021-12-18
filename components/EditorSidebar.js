import styles from '../styles/EditorSidebar.module.css'
export default function EditorSidebar(){
    const dummyWriters = ['kang ux', 'kang backend', 'kang frontend', 'kang devOps', 'kang bakso']
    return(
        <div className={styles.container}>
            <form className={styles.form}>
                <label>Title</label>
                <input type="text"/>
                <label>Description</label>
                <input type='text' maxLength="150"/>
                <label>Writers</label>
                <select name='writers' multiple>
                    {dummyWriters.map((writer)=>
                    //add key from writer id
                    <option value={writer}>{writer}</option>)}
                </select>
                <label>Segments</label>
                <select>
                    <option>Entertainment</option>
                    <option>Health</option>
                    <option>Food</option>
                    <option>Politics</option>
                </select>
            </form>
            
        </div>
    )
}