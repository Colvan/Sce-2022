import express  from 'express'
const router = express.Router()
import Post  from '../controller/post'

router.get('/',Post.getAllPosts)

router.post('/',Post.createNewPost)

router.get('/:id',Post.getPostById)

router.delete('/:id',Post.deletePostById)

export = router