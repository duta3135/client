import React, {useEffect, useState} from 'react'
import Login from '../../components/pages/login'
import { parseCookies } from '../../helpers/parseCookies'
import Head from "next/head"
import AdminLayout from '../../components/AdminLayout'
import styles from '../../styles/Admin.module.css'
import axios from 'axios'
import AdminArticleCard from '../../components/AdminArticleCard'
import Modal from '../../components/Modal'
export default function Index({cookies, articles}) {
    const [modalState, setModalState] = useState({
        text: '',
        mainAction: ()=>console.log(),
        show: false
    });
    if(cookies){
        return (
            <div>
                <Head>
                    <title>Admin Page</title>
                </Head>
                <AdminLayout>
                    <main className={styles.main}>
                        <h1>Articles</h1>
                        {articles.map((article)=>(<AdminArticleCard article={article} setModalState={setModalState}/>))}
                    </main>
                </AdminLayout>
                <Modal text={modalState.text} mainAction={modalState.mainAction} show={modalState.show} setModalState={setModalState}/>
            </div>
        )
    }else{
        return <Login/>
    }
}

Index.getInitialProps = async ({req}) =>{
    const cookies = parseCookies(req)
    const res = await axios.get('http://localhost:3001/articles')
    return {
        cookies: cookies.tcm_user,
        articles: res.data
    }
}