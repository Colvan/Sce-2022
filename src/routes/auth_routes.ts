import express from "express";
const router = express.Router();
import Auth from "../controller/auth";
import authenticate from "../common/auth_middleware";

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The Authentication API
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The user email
 *         password:
 *           type: string
 *           description: The user password
 *       example:
 *         email: 'bob@gmail.com'
 *         password: '123456'
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: registers a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Register success retuns access and refresh tokens
 *         content:
 *           application/json:
 *             schema:
 *               access_token:
 *                 type: string
 *                 description: The refresh Token
 *               refresh_token:
 *                 type: string
 *                 description: The refresh Token
 *               _id:
 *                 type: string
 *                 description: The user id
 *             example:
 *               access_token: 'bob@gmail.com'
 *               refresh_token: '123456'
 *               _id: "adfasdfasdfasdfsd"
 *
 */




router.post("/register", Auth.register);
router.post("/login", Auth.login);
router.post("/refresh", Auth.renewToken);
router.get("/test", authenticate, Auth.test);

export = router;
