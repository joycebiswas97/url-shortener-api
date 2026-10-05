require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const urlRoutes = require('./src/routes/urlRoutes')
const {redirectToUrl} = require('./src/controllers/urlController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
connectDB();

app.use('/api', urlRoutes);

app.get('/health', (req,res)=>{
  res.status(200).json({
    status: 'ok',
    service: 'URL shortener app'
  })
});

app.get('/:shortCode', redirectToUrl);

app.listen(PORT, () =>{
  console.log(`Server is running on http://localhost:${PORT}`);
});
