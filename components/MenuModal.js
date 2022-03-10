import { createPortal } from "react-dom"
import styles from '../styles/Modal.module.css'
import Link from 'next/link'
import { useEffect, useState } from "react"
const MenuModal = ({show , setModalState}) => {
    const [mounted, setMounted] = useState(false)
  
    useEffect(() => {
       setMounted(true)
       if(show){
          document.body.style.overflow = "hidden"
       }
       return ()=>{
          document.body.style.overflow = "unset"
  
       }
    }, [show])
    const element = show?(
       <div className={styles.overlay}>
          <div className={styles.modal}>
               <Link href='/articles/entertainment'><p className={styles.navLinks}>Entertainment</p></Link>
               <Link href='/articles/food'><p className={styles.navLinks}>Food</p></Link>
               <Link href='/articles/health'><p className={styles.navLinks}>Health</p></Link>
               <Link href='/articles/politics'><p className={styles.navLinks}>Politics</p></Link>
               <button className={styles.cancelBtn} onClick={()=>setModalState(false)}>close</button>
             </div>
       </div>):null
    return mounted
       ? createPortal(element, 
         document.querySelector("#modal-root"))
       : null
  }
export default MenuModal