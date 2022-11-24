import express from 'express';
import { auth } from '../middlewares/auth.js'
import { DeleteArticle, getArticle, getArticles, getUserArticles, postArticle, updateArticle } from '../controllers/articlesController.js';
const router = express.Router();


router.get('/', getArticles);
router.get('/user', auth, getUserArticles);
router.post('/',auth, postArticle);
router.put('/:id', auth, updateArticle);
router.delete('/:id', auth, DeleteArticle);
router.get('/:id', auth, getArticle);

export default router;