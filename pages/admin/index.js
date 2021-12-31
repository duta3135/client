import dynamic from 'next/dynamic'
import React from 'react'

const NoSSRLogin = dynamic(()=> import('../../../components/pages/login'), {ssr: false})
function Index() {
    if(localStorage.getItem("isLoggedIn")){
    return (
        <div>
            hello
        </div>
    )}
    else{
        return <NoSSRLogin/>
    }
}

export default Index
