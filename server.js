const express = require('express');
const app = express();
const path = require('path');

const PORT  = process.env.PORT||3000;
app.use(express.static('public'));


const connectDB =  require('./config/db');
connectDB();

//Template Engine

app.set('views', path.join(__dirname,'/views'));
app.set('view engine','ejs');

//Routes

app.use('/api/files',require('./routes/files'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/show'));



app.listen(PORT, ()=> {
    console.log(`Listening on Port ${PORT}`);
})