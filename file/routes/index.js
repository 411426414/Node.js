var express = require('express');
var router = express.Router();

const multer = require('multer')
const fs = require('fs')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send({
        success: true
    })
});
router.get('/index', function (req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.post('/upload', multer({
    dest: 'upload'
}).single('file'), (req, res) => {
    console.log(req.file);
    fs.renameSync(req.file.path, `upload/${req.file.originalname}`)
    res.send(req.file)
})
module.exports = router;
