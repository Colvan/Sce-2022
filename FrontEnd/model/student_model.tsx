import StudentApi from "./student_api"

export type Student = {
    id: String,
    name:String,
    imageUrl: String
}
export type User = {
    email:String,
    password:String
}

const getAllStudents = async ()=>{
    const students = await StudentApi.getAllStudents()
    return students
} 

const adddNewPost = async (st:Student)=>{
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
    getAllStudents,
    uploadImage,
    logIn,
    register
}