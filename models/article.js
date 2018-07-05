const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let articleSchema = mongoose.Schema({
  title: String,
  content:String,
  category:String,
  image:String,
  author: {type:Schema.Types.ObjectId,ref:'user'}
});

let Article = mongoose.model('article',articleSchema);



module.exports = Article;
