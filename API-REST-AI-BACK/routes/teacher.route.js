const express = require('express')
const router = express.Router()
const TeacherController = require('../controllers/Teachers/teacher.controller');
const UploadController = require('../controllers/upload.controller');
const Authorization = require('../auth/authorization');

// Authorize each API with middleware and map to the Controller Functions
/* GET teacher listing. */
router.get('/testTeacher', function(req, res) {
    res.send('Llegaste a la ruta de teacher');
  });

router.post('/login', TeacherController.loginTeacher);
router.post('/registration', TeacherController.createTeacher);
router.get('/',Authorization, TeacherController.getTeachers);
router.put('/', Authorization, TeacherController.updateTeacher);
router.delete('/', Authorization, TeacherController.removeTeacher);
router.post('/uploadImg',UploadController.uploadFilesImgUser);



// Export the Router
module.exports = router;



