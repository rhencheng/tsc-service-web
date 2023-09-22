
const express = require('express');
const router = express.Router();
const path = require('path')

router.post('/upload', function (request, response) {
    console.log(request.files);
    var avatarFile = request.files.avatar;
    console.log(avatarFile);
    // 处理文件上传失败
    if (!request.files || Object.keys(request.files).lengFth === 0) {
        return response.status(400).send("没有文件被上传！")
    }
    // 获取上传文件名
    var fileName = avatarFile.name;// 注意avatar对应input标签的name属性值
    // 设定文件的保存路径
    var uploadPath = path.join('static', 'upload', fileName);
    // 使用mv方法来将上传文件保存到指定路径下
    // mv(filePath, callback)有两个参数：filePath指定是上传文件的保存路径，callback是回调函数用来处理判断是否上传成功并且有一个参数err表示错误对象
    avatarFile.mv(uploadPath, function (err) {
        if (err)
            return response.status(500).send(err);
        response.send('Upload successfully:' + "upload/" + fileName);
    });
});

module.exports = router;