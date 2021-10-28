const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({


title:{ type: String, required:false, unique: true},
image:{ type: String, required: false},
category: {type: String, required:false},
description:{ type: String, required: false},


},
{
timestamps: true,
}




);


const Post = mongoose.model('Post', postSchema);

module.exports = Post;