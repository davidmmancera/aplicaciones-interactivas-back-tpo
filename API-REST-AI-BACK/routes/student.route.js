const express = require('express')
const router = express.Router()
const StudentController = require('../controllers/Students/student.controller');
const UploadController = require('../controllers/upload.controller');
const MailController = require('../controllers/Users/mail.controller');
const Authorization = require('../auth/authorization');

// Authorize each API with middleware and map to the Controller Functions
/* GET student listing. */
router.get('/testStudent', function(req, res) {
    res.send('Llegaste a la ruta de student');
  });
router.post('/registration', StudentController.createStudent);
router.get('/',Authorization, StudentController.getStudents);
router.put('/', Authorization, StudentController.updateStudent);
router.delete('/', Authorization, StudentController.removeStudent);
router.post('/uploadImg',UploadController.uploadFilesImgUser);
router.post('/sendMail',MailController.sendEmail)



// Export the Router
module.exports = router;



