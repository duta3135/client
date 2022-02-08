import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

const Portal= ({ children , show}) => {
   const [mounted, setMounted] = useState(false)

   useEffect(() => {
      setMounted(true)

      return () => setMounted(false)
   }, [])
   const element = (<div>hi{children}</div>)
   return mounted
      ? createPortal(element, 
        document.querySelector("#myportal"))
      : null
}

export default Portal
