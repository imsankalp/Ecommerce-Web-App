const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
// const seedDB = require('./seed');
const productRoutes = require('./routes/product');
const methodOverride = require('method-override');

mongoose.connect('mongodb://localhost:27017/shopApp',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify:false
    })
    .then(() =>{
        console.log("DB connected");
    })
    .catch((err) => {
        console.log(err);
    });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// seedDB();

app.get('/', (req, res) => {

    res.send('Landing Page');
})


app.use(productRoutes);


app.listen(3000, () => {

    console.log("Server running at port no 3000");
})