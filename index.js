const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(()=> {
    console.log('Connected to database successfully!')
})
.catch((err)=> {
    console.log(`Couldn\'t connect to database: ${err}`)
});

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {
   console.log(`Server is running on port ${PORT}.`)
});