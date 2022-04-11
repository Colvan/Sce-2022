import express from 'express'
const router = express.Router()
import Post from '../controller/post'
import authenticate from '../common/auth_middleware'



/**
 * @swagger
 * tags:
 *   name: Post
 *   description: The Posts managing API
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - sender
 *         - message
 *       properties:
 *         sender:
 *           type: string
 *           description: the senders mail
 *         message:
 *           type: string
 *           description: the message
 *       example:
 *         sender: 'bob@gmail.com'
 *         message: 'this is a message by bob'
 */
/**
 * @swagger
 * /post:
 *   get:
 *     summary: Getting all Posts
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: Succesfly obtain all Posts             
 *
 */

/**
 * @swagger
 * /post/{id}:
 *   get:
 *     summary: Getting Post by id 
 *     parameters:
 *     - in: path
 *       namee: id
 *       description: the posts id 
 *       required: true
 *       input: 624d8f0b439e9fe03350229f
 *       type: String
 *       id: 624d8f0b439e9fe03350229f
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: successfully obtain a post by id  
 *       400:
 *         description: No id Provided
 *            
 *
 */
























router.get('/',Post.getAllPosts)

router.post('/',authenticate,Post.createNewPost)

router.get('/:id',Post.getPostById)

router.delete('/:id?',authenticate,Post.deletePostById)



export = router
