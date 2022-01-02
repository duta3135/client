import React, {useEffect, useState} from 'react'
import Login from '../../components/pages/login'
function Index() {
    if(window.localStorage.isLoggedIn){
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
