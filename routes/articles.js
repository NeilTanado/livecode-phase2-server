var express = require('express');
var router = express.Router();
const photo = require('../middlewares/upload');
var Controller = require('../controller/articleController');

/* GET users listing. */
router.post('/createarticle', photo.multer.single('image'), photo.upload,Controller.createArticle);

router.get('/dataarticle',Controller.readArticle);

router.put('/updatearticle/:id',Controller.updateArticle);

router.delete('/deletearticle/:id',Controller.deleteArticle);

module.exports = router;
