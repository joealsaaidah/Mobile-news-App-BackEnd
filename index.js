import express from 'express'
//import news from './news/news.js'
import newsRouter from './routers/news.js'

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(express.static('data/uploads'));

app.use('/api',newsRouter); // =>localhost:5000/api/create */

app.listen(PORT, ()=>{
    console.log(`app is running on port: ${PORT}`)
});