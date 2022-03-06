import axios from "axios";
export async function removeWriter(username, headers){
    axios.delete(`${process.env.API_URL}/writers/${username}`, headers)
}