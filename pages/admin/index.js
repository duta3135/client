import React, {useEffect, useState} from 'react'
import Login from '../../components/pages/login'
import { parseCookies } from '../../helpers/parseCookies'
export default function Index({cookies}) {
    if(cookies){
        return (
            <div>
                hello
                <pre>{cookies!==null?JSON.stringify(cookies):"no data"}</pre>
            </div>
        )
    }else{
        return <Login/>
    }
}

Index.getInitialProps = async ({req}) =>{
    const cookies = parseCookies(req)

    return {
        cookies: cookies.tcm_user,
    }
}