import express from 'express';
import upload from '../middleware/multer.js'
import {createNews, getAllNews,getSingleNews,getNewsByCategory, searchPosts} from '../controllers/news.js'
import {validator, result, validateFile} from '../middleware/validator.js'

const router = express.Router();

const uploads = upload;

router.post('/create',uploads.single('thumbnail'),validator,result, validateFile,createNews)

router.get('/news', getAllNews)
router.get('/news/single/:id', getSingleNews)
router.get('/news/:category/:qty?', getNewsByCategory)
router.post('/news/search/:query', searchPosts)



export default router;