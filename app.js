const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/BlogRoutes')
// express app 
const app = express();
 
// connect to mongodb
const dbURI = 'mongodb+srv://usertest1:Adnane7fcb@nodetuts.3sapo.mongodb.net/nodetuts?retryWrites=true&w=majority&appName=nodetuts';
mongoose.connect(dbURI)
  .then((result)=> app.listen(3000))
  .catch((err)=> console.log(err))

// ejs setup 
app.set('view engine','ejs');

//middleware static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});


//  routes

app.get('/',(req,res)=>{
  res.redirect('/blogs');
});

app.get('/about',(req,res)=>{
  res.render('about',{title:'About'});
});

// blog routes
app.use('/blogs',blogRoutes);

 // 404 page
 app.use((req,res)=>{
    res.status(404).render('404',{title:'404'});
 });