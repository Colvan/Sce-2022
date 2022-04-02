const Post = require('../models/post_model')

/**
 * Gets all the posts
 * @param {http request} req 
 * @param {http response} res 
 */
const getAllPosts = async (req, res) => {
    console.log('getAllPosts')

    try{
        const sender = req.query.sender
        let posts
        if (sender != null | sender != undefined){
            posts = await Post.find({'sender':sender})
        }else{
            posts = await Post.find()
        }
        res.status(200).send(posts)
    }catch(err){
        res.status(400).send({
            'err': err.message
        })
    }

}


const getPostById = async (req, res)=>{
    console.log('getPostById id=' + req.params.id)
    const id = req.params.id
    if (id == null | id == undefined){
        return res.status(400).send({'err':'no id provided'})
    }

    try{
        post = await Post.findById(id)
        if (post == null){
            res.status(400).send({
                'err': 'post doesnot exists'
            })
        }else{
            res.status(200).send(post)
        }
    }catch(err){
        res.status(400).send({
            'err': err.message
        })
    }
}

/**
 * Create new post
 * @param {http request} req 
 * @param {http response} res 
 */
const createNewPost = async (req, res) => {
    console.log(req.body)

    const post = Post({
        message: req.body.message,
        sender: req.body.sender
    })

    try {
        newPost = await post.save()
        res.status(200).send(newPost)
    } catch (err) {
        res.status(400).send({
            'err': err.message
        })
    }
}

const deletePostById = async (req, res)=>{
    console.log('deletePostById id=' + req.params.id)
    const id = req.params.id
    if (id == null | id == undefined){
        return res.status(400).send({'err':'no id provided'})
    }

    try{
        await Post.deleteOne({"_id":id})
        res.status(200).send()
    }catch(err){
        res.status(400).send({
            'err': err.message
        })
    }
}
module.exports = {
    getAllPosts,
    createNewPost,
    getPostById,
    deletePostById
}



