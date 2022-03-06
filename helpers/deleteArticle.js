import axios from "axios";
export async function deleteArticle(id, headers){
    axios.delete(`${process.env.API_URL}/articles/${id}`, headers)
}