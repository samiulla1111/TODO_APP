const express=require('express');
const path=require('path');
const port=8001;
const db=require('./config/mongoose');
const Contact=require('./models/details');

const app=express();

app.set('view engine','ejs');

app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('asets'));

// var Todolist=[
//     {
//         description:"one",
//         category:"study",
//         date:"01-11-13"
//     },
//     {
//         description:"two",
//         category:"hardwork",
//         date:"01-11-13"
//     },
//     {
//         description:"three",
//         category:"more",
//         date:"01-11-13"
//     }
// ]


app.get('/',function(req,res){
    Contact.find({},function(err,contact){
        if(err){
            console.log('error accured while fetching the data');
            return;
        }

        return res.render('home',{
            title:"TODO-LIST",
            todo_list:contact
        });
    });
    
});
app.post('/create_todo',function(req,res){
    // console.log(req.body);
   
    Contact.create({
        description:req.body.description,
        category:req.body.category,
        date:req.body.date
    },function(err,newContact){
        if(err){
            console.log('error in creating contact');
            return ;
        }

        console.log('**********',newContact);
        return res.redirect('back');
    });
    // return res.redirect('/');
    

});
app.get('/delete-details',function(req,res){
    const ide=req.query.id;
    
    Contact.findByIdAndDelete(ide,function(err){
        if(err){
            console.log('error in deleting an object from database');
            return;
        }
    });
    return res.redirect('back');
});


app.listen(port,function(err){

    if(err){
        console.log('error is accured',err);
    }

    console.log('this is express port',port);
});