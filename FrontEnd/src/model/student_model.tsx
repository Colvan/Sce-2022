import StudentApi from "./student_api"

export type Post = {
    id: String,
    message:String,
    imageUrl: String
}

const getAllPosts = async ()=>{
    const posts = await StudentApi.getAllPosts()
    return posts
} 

const addNewPost = async (st:Post)=>{
    await StudentApi.addNewPost(st)
} 

const uploadImage = async (imageUri:String)=> {
    const url = await StudentApi.uploadImage(imageUri)
    return url
}



export default {
    addNewPost,
    getAllPosts,
    uploadImage,
}