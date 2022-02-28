import axios from "axios";
export async function removeWriter(username){
    axios.delete(`${process.env.API_URL}/writers/${username}`)
}