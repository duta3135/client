import styles from '../styles/SplitActionBtn.module.css'
import React, {useState} from 'react'

export default function DynamicSplitBtn(props) {
    const [dropdown, setDropdown] = useState(false)
    const changeDropDown = () => {{
        setDropdown(!dropdown)
    }}
    if (!props.isPublished) {
    return( 
    <div>
        <div className={styles.wrapper}>
            <button className={styles.mainBtn} onClick={()=>props.setModalState({
                    text: `Post ${props.title} to site?`,
                    mainAction: ()=>props.update(true),
                    show: true
                })}>Post to site</button>
            <button className={styles.btnDown} onClick={()=> changeDropDown()}>
                <svg fill='white' height='15' viewBox='0 0 24 20' width='15' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>
            </button>
            <div className={dropdown ? styles.dropdownOpen : styles.dropdownClosed} onClick={()=>props.setModalState({
                    text: `Update ${props.title}?`,
                    mainAction: ()=>props.update(false),
                    show: true
                })}>update drafts</div>
        </div>
    </div>)
        
    } else {
        return(
            <div>
                <button onClick={()=>props.setModalState({
                    text: `Update ${props.title}?`,
                    mainAction: ()=>props.update(true),
                    show: true
                })}>Update site</button>
            </div>
        )
    }
}


