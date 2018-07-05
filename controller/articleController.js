const Article = require('../models/article');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports ={

  createArticle:(req,res)=>{
    console.log(req.body);
    var decoded = jwt.verify(req.headers.token, 'secret');
    var newArticle = new Article({
      image : req.file.imageURL,
      title:req.body.title,
      content:req.body.content,
      category:req.body.category,
      author: decoded.id
    });
    newArticle.save()
      .then(dataArticle=>{
        User.findOneAndUpdate({_id:decoded.id},{
          $push:{
            article:dataArticle._id
          }
        })
        .then((value) => {
          res.status(200).json({
            message:'berhasil create author',
            value
          });
        })
        .catch((err) => {
          res.status(500).json({
            message:'gagal create ada yang salah'
          });
        });
      })
      .catch((err) => {
        res.status(500).json({
          message:'gagal create ada yang salah'
        });
      });
  },

  readArticle:(req,res)=>{
    Article.find()
    .populate('author')
    .then(data=>{
      res.status(200).json({
        message: 'data dikirim',
        data
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: 'anda tidak ada authorized'
      });
    });
  },

  updateArticle:(req,res)=>{
    Article.update({
      _id:req.params.id
    },{
      $set:req.body
    })
    .then(data=>{
      res.status(200).json({
        message: 'data diupdate',
        data
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: 'anda tidak ada authorized'
      });
    });
  },

  deleteArticle:(req,res)=>{
    Article.findByIdAndRemove({
      _id:req.params.id
    })
    .then(data=>{
      res.status(200).json({
        message: 'data didelete',
        data
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: 'anda tidak ada authorized'
      });
    });
  }
};
