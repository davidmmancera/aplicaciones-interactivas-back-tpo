const express = require('express')
const router = express.Router()
const TeacherController = require('../controllers/Teachers/teacher.controller');
const UploadController = require('../controllers/upload.controller');
const MailController = require('../controllers/Users/mail.controller');
const Authorization = require('../auth/authorization');
const UserController = require("../services/Users/user.service");

// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/test', function(req, res) {
    res.send('Llegaste a la ruta de users');
  });
router.post('/registration', UserController.createUser)
router.post('/login/', UserController.loginUser)
router.get('/',Authorization, UserController.getUsers)
router.put('/', Authorization, UserController.updateUser)
router.post('/uploadImg',UploadController.uploadFilesImgUser);
router.post('/sendMail',MailController.sendEmail)



// Export the Router
module.exports = router;



