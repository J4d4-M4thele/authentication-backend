const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

//connect to database
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

//request results will be in json format
app.use(express.json());
//auth route
app.use('/auth', require('./routes/user'));

//port set
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {
   console.log(`Server is running on port ${PORT}.`)
});