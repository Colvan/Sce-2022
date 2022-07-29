import express from 'express'
const router = express.Router()
import { getUserProfile,updateProfile } from '../controller/porfile'

router.post('/getProfile',getUserProfile)


router.post('/updateProfile', updateProfile)

export = router
