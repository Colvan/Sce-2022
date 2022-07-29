import apiClient from "./ApiClient";
import { Post } from "./student_model";
import FormData from "form-data";

const getAllPosts = async () => {
  const res = await apiClient.get("/post");
  let posts = Array<Post>();
  if (res.ok) {
    if (res.data) {
      res.data.forEach((item) => {
        const st: Post = {
          id: item.sender,
          message: item.message,
          imageUrl: item.imageUrl,
          postId: item._id,
        };
        posts.push(st);
      });
    }
  } else {
    console.log("getAllStudents fail");
  }
  return posts;
};

const addNewPost = async (st: Post, token: String) => {
  console.log(st);

  const res = await apiClient.post(
    "/post",
    {
      sender: st.id,
      message: st.message,
      imageUrl: st.imageUrl,
      postId: st.postId,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (res.ok) {
    console.log(st.id + "Added New Post ");
  } else {
    console.log("add new post fail");
  }
};

const uploadImage = async (imageUri: String) => {
  console.log("uploadImage");
  const formData = new FormData();
  formData.append("file", { name: "name", type: "image/jpeg", uri: imageUri });
  let url = "/file/file";
  const res = await apiClient.post(url, formData);
  if (res.ok) {
    console.log("uploadImage passed " + res.data);
    return res.data.url;
  } else {
    console.log("save failed " + res.problem);
  }
};

const getPostsByUser = async (mail: String) => {
  const res = await apiClient.get("/post/user/" + mail);
  let posts = Array<Post>();
  if (res.ok) {
    if (res.data != "No posts by user found") {
      res.data.forEach((item) => {
        const st: Post = {
          id: item.sender,
          message: item.message,
          imageUrl: item.imageUrl,
          postId: item._id,
        };
        posts.push(st);
      });
    }
  } else {
    console.log("getPostsByUser fail");
  }
  return posts;
};

const deletePost = async (id: String, token: String) => {
  const res = await apiClient.delete(
    "/post/" + id,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (res.ok) {
    console.log(id + "post deleted ");
  } else {
    console.log(res.data);

    console.log("delete post fail");
  }
};

const updatePost = async (
  id: String,
  message: String,
  imgURL: String,
  token: String
) => {
  const res = await apiClient.post(
    "/post/updatepost/" + id,
    { message: message, imageUrl: imgURL },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (res.ok) {
    console.log(id + "update post ");
  } else {
    console.log(res.data);

    console.log("update post fail");
  }
};

const getUserProfile = async (
  email: String
) => {
  const res = await apiClient.post(
    "/profile/getProfile",
    { email: email}
  );
  if (res.ok) {
    console.log(email + "profile  ");
    return res;
  } else {
    console.log(res.data);

    console.log("get profile fail");
  }
};


const updateUserProfile = async (
  firstname:String,
  lastname:String,
  email: String,
  imageUrl:String
) => {
  const res = await apiClient.post(
    "/profile/updateProfile",
    { firstname:firstname,lastname:lastname,email: email,imageUrl:imageUrl}
  );
  if (res.ok) {
    console.log(email + "profile has been updated ");
  } else {
    console.log(res.data);

    console.log("update profile fail");
  }
};




export default {
  getAllPosts,
  addNewPost,
  uploadImage,
  getPostsByUser,
  deletePost,
  updatePost,
  getUserProfile,
  updateUserProfile
};
