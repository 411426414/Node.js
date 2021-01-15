var express = require('express');
var router = express.Router();

const multer = require('multer')
const fs = require('fs')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({
    success:true
  })
});


module.exports = router;
