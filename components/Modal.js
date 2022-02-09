import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import styles from '../styles/Modal.module.css'

const Portal= ({ children , show}) => {
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
            {children}
         </div>
      </div>):null
   return mounted
      ? createPortal(element, 
        document.querySelector("#modal-root"))
      : null
}

export default Portal
