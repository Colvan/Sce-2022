const express = require('express')
const router = express.Router()
const Post = require('../controller/post')

router.get('/',Post.getAllPosts)

router.post('/',Post.createNewPost)

router.get('/:id',Post.getPostById)

router.delete('/:id',Post.deletePostById)

module.exports = router