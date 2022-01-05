import React, {useEffect, useState} from 'react'
import Login from '../../components/pages/login'
import { parseCookies } from '../../helpers/parseCookies'
import cookie from "cookie"
export default function Index({data}) {
    console.log(data)
    if(data){
        return (
            <div>
                hello
                <pre>{data!==null?JSON.stringify(data):"no data"}</pre>
            </div>
        )
    }else{
        return <Login/>
    }
}

Index.getInitialProps = async ({req}) =>{
    const data = parseCookies(req)

    return {
        data: data.user,
    }
}