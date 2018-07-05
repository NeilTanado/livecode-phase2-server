const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports ={
  createUser:(req,res)=>{
    if(req.body.password.length > 4){
      var hash = bcrypt.hashSync(req.body.password, 10);
      var newUser = new User({
      name:req.body.name,
      email:req.body.email,
      password: hash
    });
    newUser.save()
      .then(dataUser=>{
        res.status(201).json({
          message: 'berhasil add',
          dataUser
        });
      })
      .catch((err) => {
        res.status(500).json({
          message:'gagal create ada yang salah'
        });
      });
    }else{
      res.status(400).json({
        message :'gagal create ada yang salah'
      });
    }
  },

  signin:(req,res)=>{
    User.findOne({email:req.body.email})
    .then(dataUserLogin=>{
      var cekPassword = bcrypt.compareSync(req.body.password, dataUserLogin.password);
      if(cekPassword===true){
        var token = jwt.sign({id:dataUserLogin._id,name:dataUserLogin.name,email:dataUserLogin.email},'secret');
        var userId = dataUserLogin._id;
        res.status(200).json({
          message:'sukses login',
          token,userId
        });
      }else{
        res.status(400).json({
          message:'wrong password'
        });
      }
    });
  }

};
