import { userToken } from "../store/authSlice"
import StudentApi from "./student_api"

export type Post = {
    id: String,
    message:String,
    imageUrl: String,
    postId:String
}

export type Profile = {
    firstName: String,
    lastName:String
    imageUrl: String
    email: String    
}

const getAllPosts = async ()=>{
    const posts = await StudentApi.getAllPosts()
    return posts
} 

const addNewPost = async (st:Post,token:String)=>{
    await StudentApi.addNewPost(st,token)
} 

const uploadImage = async (imageUri:String)=> {
    const url = await StudentApi.uploadImage(imageUri)
    return url
}

const getPostsByUser = async (mail:String)=> {
    const posts = await StudentApi.getPostsByUser(mail)
    return posts
}

const deletePost = async (id:String,token:String)=>{
    await StudentApi.deletePost(id,token)
} 

const updatePost = async (id:String,message:String,imgURL:String,token:String)=>{
    await StudentApi.updatePost(id,message,imgURL,token)
} 

const getUserProfile = async (email:String)=>{
    const profile = await StudentApi.getUserProfile(email)
    return profile;
} 
const updateUserProfile = async (firstname:String,lastname:String,email:String,imageUrl:String)=>{
    await StudentApi.updateUserProfile(firstname,lastname,email,imageUrl)
} 

const createUserProfile = async (firstname:String,lastname:String,email:String,imageUrl:String)=>{
    await StudentApi.createUserProfile(firstname,lastname,email,imageUrl)
} 

export default {
    addNewPost,
    getAllPosts,
    uploadImage,
    getPostsByUser,
    deletePost,
    updatePost,
    getUserProfile,
    updateUserProfile,
    createUserProfile
}