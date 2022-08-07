import express from 'express';
import { auth } from '../middlewares/auth.js'
import { getArticles } from '../controllers/articlesController.js';
const router = express.Router();


router.get('/',auth, getArticles);

export default router;