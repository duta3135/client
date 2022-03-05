import { NextResponse } from 'next/server'
export function middleware(req, event){
    const str="tcm_user="
    const cookies = req.headers.get('cookie').split('; ')
    // if( cookies.some(v=>v.includes(str)) || req.path==='/admin/login'){
    //     console.log("yas")
    // }else{
    //     console.log("naur")
    // }
}