import express from 'express'
const router = express.Router()
import { getUserProfile,updateProfile,createProfile } from '../controller/profile'

router.post('/getProfile',getUserProfile)


router.post('/updateProfile', updateProfile)

router.post('/createProfile', createProfile)


export = router
