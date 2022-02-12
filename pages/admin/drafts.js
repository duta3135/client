import React, {useEffect, useState} from 'react'
import Login from '../../components/pages/login'
import { parseCookies } from '../../helpers/parseCookies'
import Head from "next/head"
import AdminLayout from '../../components/AdminLayout'
import styles from '../../styles/Admin.module.css'
import axios from 'axios'
import AdminArticleCard from '../../components/AdminArticleCard'

export default function Index({cookies, articles}) {
    if(cookies){
        return (
            <div>
                <Head>
                    <title>Drafts</title>
                </Head>
                <AdminLayout>
                    <main className={styles.main}>
                        <h1>Drafts</h1>
                        {articles.length > 0 ? 
                        articles.map((article)=>(<AdminArticleCard article={article}/>)):
                        <h3>nothing to see here</h3>}
                    </main>
                </AdminLayout>
            </div>
        )
    }else{
        return <Login/>
    }
}

Index.getInitialProps = async ({req}) =>{
    const cookies = parseCookies(req)
    const res = await axios.get(`${process.env.API_URL}/articles?published=false`)
    return {
        cookies: cookies.tcm_user,
        articles: res.data
    }
}