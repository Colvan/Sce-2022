import StudentApi from "./student_api"

export type Post = {
    id: String,
    message:String,
    imageUrl: String
}
export type User = {
    email:String,
    password:String
}

const getAllPosts = async ()=>{
    const posts = await StudentApi.getAllPosts()
    return posts
} 

const adddNewPost = async (st:Post)=>{
    await StudentApi.adddNewPost(st)
} 

const uploadImage = async (imageUri:String)=> {
    const url = await StudentApi.uploadImage(imageUri)
    return url
}

const logIn = async (email:String,password:String)=> {
    const login = await StudentApi.logIn(email,password)
    return login;
}
const register = async (email:String,password:String)=> {
    const register = await StudentApi.register(email,password);
     return register;
    
}

export default {
    adddNewPost,
    getAllPosts,
    uploadImage,
    logIn,
    register
}