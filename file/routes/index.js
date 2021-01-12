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
    res.render('index', {title: 'Express'});
});

router.post('/upload', multer({
    dest: 'upload'
}).single('file'), (req, res) => {
    console.log(req.file);
    fs.renameSync(req.file.path, `upload/${req.file.originalname}`)
    res.send(req.file)
})

router.post('/uploads', multer({
    dest: 'upload'
}).array('file', 10), (req, res) => {
    const files = req.files
    const fileList = []
    // for (var i in files) {
    for (var i = 0; i < files.length; i++) {
        let file = files[i]
        fs.renameSync(file.path, `upload/${file.originalname}`)
        file.path = `upload/${file.originalname}`
        fileList.push(file)
    }
    res.send(fileList)
})
router.get('/download', (req, res) => {
    console.log(req.query);
    const url = req.query.url
    url ? res.download(`upload/${url}`) : res.send({success: false})
})


var upload = multer({dest: 'upload/'});//设置上传文件存储地址
router.post('/uploadFile', upload.single('file'), (req, res, next) => {
    var file = req.file;
    if (file) {
        var fileNameArr = file.originalname.split('.');
        var suffix = fileNameArr[fileNameArr.length - 1];
        var fileName = fileNameArr[fileNameArr.length - 2];
        // 文件重命名
        fs.renameSync('./upload/' + file.filename, `./upload/${fileName}.${suffix}`);
        file['newFileName'] = `${fileName}.${suffix}`;
    }
    res.send(file);
})

router.use('/downloadFile', (req, res, next) => {
    var filename = req.query.filename;
})


module.exports = router;
