import React, {useState} from 'react'
import Login from '../../components/pages/login'
import { parseCookies } from '../../helpers/parseCookies'
import Head from "next/head"
import {removeWriter} from '../../helpers/removeWriter'
import AdminLayout from '../../components/AdminLayout'
import styles from '../../styles/Admin.module.css'
import axios from 'axios'
import Modal from '../../components/Modal'
import WriterCard from '../../components/WriterCard'
export default function Index({cookies, writers}) {
    async function deleteWriter(username){
        removeWriter(username)
    }
    const [modalState, setModalState] = useState({
        text: '',
        mainAction: ()=>{},
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
                        <h1>Writers</h1>
                        {writers.map((writer)=>(<WriterCard name={writer.name} insta={writer.insta} username={writer.username} deleteWriter={deleteWriter} setModalState={setModalState}/>))}
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
    const res = await axios.get(`${process.env.API_URL}/writers`)
    return {
        cookies: cookies.tcm_user,
        writers: res.data
    }
}