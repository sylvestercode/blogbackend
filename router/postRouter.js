const express = require('express');
const app  = express();

const expressAsyncHandler =  require('express-async-handler');



const Post = require('../model/postModel');




// function to store image to folder 

const fs = require('fs');
const path = require('path');
const multer = require('multer');



const storage = multer.diskStorage({ 
  destination: (req, file, cb) => { 
      cb(null, './img/') 
  }, 
  filename: (req, file, cb) => { 
      cb(null, new Date().toDateString() + file.originalname) 
  } 
}); 

var upload = multer({ storage: storage });



const  postRouter = express.Router();


 
  // adding post to database

  postRouter.post('/addpost', upload.single('image'), expressAsyncHandler(async(req,res) =>{
  
   // console.log(req.file);
  
    const post = new Post({
    
      title: req.body.title,
      image: req.file.filename,
      category: req.body.category,
      description: req.body.description,
  
       
    });
  
   
    try{
      
      const  result = await post.save();
        if(result){
      res.send({message:"NEW POST ADDED SUCCESSFULLY"});
        }

     }catch(error){
  
     res.status(500).send({error: 'Error adding  New post'});
     
     }
     
  
   }));
  



// select all post

postRouter.get(
    '/',
    
    expressAsyncHandler(async (req,res) => {
    

    try{
     const post = await Post.find({});


     if(post == ''){

        res.send({ message: "No available post"});
     }else{
     res.send(post);
     }
    }catch{
        res.status(404).send({ error: "Post not found"}); 
    }
    
    })
    
    ); 
    
    
// select single post

postRouter.get(
  '/:id',
  
  expressAsyncHandler(async (req,res) => {
  

  try{
   const post = await Post.findById(req.params.id);


   if(post == ''){

      res.send({ message: "No available post"});
   }else{
    const result = res.send(post);

   }
  }catch{
      res.status(404).send({ error: "Post not found"}); 
  }
  
  })
  
  ); 
  
  


   

// edit  each post 

postRouter.put('/editpost/:id', upload.single('image'), expressAsyncHandler(async(req,res) =>{
      
    try{
      const  post = await Post.findById(req.params.id);
  
      const body = req.body;
      
      const title = body.title;
      
      const category = body.category;

      const description = body.description;
     
      
   
    
      const updates = {
            title,
            category,
            description,
    
  
      }
   
    if(req.file){
  
     
      const image = req.file.filename;
      updates.image = image;
  
  
    }
      Object.assign(post,updates)
     const result =  post.save();
    
  
       if(result){

     res.send({message:"POST UPDATED SUCCESSFULLY"});
       }
    } catch {
  
        res.status(404).send({ error: "Post not found"});
    
      }
  
  }));
  
  
//delete post 

postRouter.delete('/deletepost/:id', expressAsyncHandler(async(req,res) =>{

    try{
      const  post = await Post.findById(req.params.id);
  
       await post.remove();
  
       res.send({ message: "Post Deleted Successfully"});
    } catch {
      res.send({ message: "Post No Longer Available"});  
    }
  
  }));
  




module.exports= postRouter;