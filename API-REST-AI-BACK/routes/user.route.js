var express = require('express')
var router = express.Router()
var UserController = require('../controllers/Users/users.controller');
var UploadController = require('../controllers/upload.controller');
var MailController = require('../controllers/mail.controller');
var Authorization = require('../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/testUser', function(req, res) {
    res.send('Llegaste a la ruta de users');
  });
router.post('/login', UserController.loginUser)
router.get('/all',Authorization, UserController.getAllUser)
router.get('/',Authorization, UserController.getUser)
router.post('/userByMail', Authorization, UserController.getUsersByMail)
router.put('/', Authorization, UserController.updateUser)
router.put('/recoverPassword', Authorization, UserController.recoverPassword)
router.delete('/', Authorization, UserController.removeUser)
router.post('/guardarImgUser',UserController.guardarImagenUser)
router.post('/uploadImg',UploadController.uploadFilesImgUser);
router.post('/imgUserByMail',Authorization,UserController.getImagenUserByMail)
router.post('/sendMail', MailController.sendEmail)



// Export the Router
module.exports = router;



