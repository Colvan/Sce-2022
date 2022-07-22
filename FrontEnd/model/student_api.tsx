import apiClient from "./ApiClient"
import { Student } from "./student_model"
import FormData from 'form-data'

const getAllStudents = async () => {
    console.log("getAllStudents")
    const res = await apiClient.get("/post")
    let students = Array<Student>()
    if (res.ok) {
        console.log("getAllStudents res.data " + res.data)
        if (res.data){
            res.data.forEach((item)=>{
                console.log("getAllStudents item " + item.message)
                const st:Student = {
                    id: item.sender,
                    name: item.message,
                    imageUrl: item.imageUrl
                }
                students.push(st)
            })
        }
    } else {
        console.log("getAllStudents fail")
    }
    return students
}

const adddNewPost = async (st: Student) => {
    const res = await apiClient.post("/post", {
        sender: st.id,
        message: st.name,
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


const logIn = async (email:String,password:String) => {
    const res = await apiClient.post("/auth/login", {
        email: email,
        password: password
    })
    if (res.ok) {
        console.log("user loged in");
        return res.data;
    } else {
        console.log("login failed")
    }
} 
const register = async (email:String,password:String) => {
    const res = await apiClient.post("/auth/register", {
        email: email,
        password: password
    })
    if (res.ok) {
        console.log("user registered ");
        return res.data;
    } else {
        console.log("register failed");
    }
} 



export default {
    getAllStudents,
    adddNewPost,
    uploadImage,
    logIn,
    register
}
