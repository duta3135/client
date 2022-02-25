import axios from "axios";
export async function deleteArticle(id){
    axios.delete(`${process.env.API_URL}/articles/${id}`)
}