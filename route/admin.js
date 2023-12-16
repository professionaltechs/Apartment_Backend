import express from 'express'
import { signUp, signIn, createUser, getAllUsers } from '../controller/admin.js';
import authentication from '../middleware/authentication.js';

const router = express.Router();

router.post("/signup", signUp)

router.post("/signin", signIn)

router.post("/createUser", authentication, createUser)

router.post("/getAllUsers", authentication, getAllUsers)

export default router;