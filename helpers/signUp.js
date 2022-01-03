import axios from 'axios'
import { useRouter } from 'next/router'
export async function signUp(data){
    const router = useRouter()
    if(data.password === data.confirmPassword){
        try {
            axios.post('http://localhost:3001/writers', {
                username: data.username,
                name: data.name,
                password: data.password,
                insta: data.insta
            })
            .then(
                localStorage.setItem("isLoggedIn", true),
                router.push('/admin')
            )  
        } catch (err) {
            alert('failed to sign you up')
            console.error(err)
        }
    }
    else{
        return        
    }
}