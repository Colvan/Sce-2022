import apiClient from "./ApiClient"
import { Post } from "./student_model"
import FormData from 'form-data'

const getAllPosts = async () => {
    console.log("getAllPosts")
    const res = await apiClient.get("/post")
    let posts = Array<Post>()
    if (res.ok) {
        console.log("getAllStudents res.data " + res.data)
        if (res.data){
            res.data.forEach((item)=>{
                const st:Post = {
                    id: item.sender,
                    message: item.message,
                    imageUrl: item.imageUrl
                }
                posts.push(st)
            })
        }
    } else {
        console.log("getAllStudents fail")
    }
    return posts
}

const addNewPost = async (st: Post) => {
    const res = await apiClient.post("/post", {
        sender: st.id,
        message: st.message,
        imageUrl: st.imageUrl
    })
    if (res.ok) {
        console.log(st.id +"Added New Post ")
    } else {
        console.log("add bew post fail")
    }
} 

const uploadImage = async (imageUri:String)=> {
    console.log("uploadImage")
    const formData = new FormData()
    formData.append('file',{name: 'name', type:'iamge/jpeg', uri: imageUri})
    let url = '/file/file'
    const res = await apiClient.post(url,formData)
    if (res.ok){
        console.log("uploadImage passed " + res.data)
        return res.data.url
    }else{
        console.log("save failed " + res.problem)
    }
}






export default {
    getAllPosts,
    addNewPost,
    uploadImage,
}
