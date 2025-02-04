import { Router } from 'express';
import { ping, profile, signin, signup } from '../controllers/auth.controller';
import { verifyToken } from '../middlewares/verifyToken.handler';


const router = Router();


router.get('/ping', ping);
router.post('/signup', signup);
router.post('/signin', signin);
router.get('/profile', verifyToken, profile);

export default router;