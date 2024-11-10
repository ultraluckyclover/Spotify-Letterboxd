import { Router } from "express"
import { getUserData } from "../controllers/User.controller.js"
const router = Router();

router.get('/userdata', getUserData);

export default router;

