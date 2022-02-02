import React, {useEffect, useState} from 'react'
import Login from '../../components/pages/login'
import { parseCookies } from '../../helpers/parseCookies'
import Head from "next/head"
import AdminLayout from '../../components/AdminLayout'

export default function Index({cookies}) {
    if(cookies){
        return (
            <div>
                <Head>
                    <title>Admin Page</title>
                </Head>
                <AdminLayout>
                    
                </AdminLayout>
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