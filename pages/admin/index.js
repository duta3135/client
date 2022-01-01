import dynamic from 'next/dynamic'
import React, {useEffect, useState} from 'react'
import Login from '../../components/pages/login'
function Index() {
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    useEffect(() => {
        if(localStorage.getItem('isLoggedin')===true){
            setIsLoggedIn(true)
        }
    }, [])
    if(isLoggedIn){
        return (
            <div>
                hello
                <pre>{JSON.stringify(window.localStorage)}</pre>
            </div>
        )
    }else{
        return <Login/>
    }
}

export default Index
