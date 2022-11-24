const express = require('express')
const router = express.Router()
const CourseController = require('../controllers/others/course.controller');
var Authorization = require('../auth/authorization');
// Authorize each API with middleware and map to the Controller Functions
/* GET Course listing. */
router.get('/testCourse', function(req, res) {
    res.send('Llegaste a la ruta de Cursos');
  });
router.get('/',Authorization, CourseController.getCourse);
router.post('/create', CourseController.createCourse);
router.put('/', Authorization, CourseController.updateCourse);
router.delete('/', Authorization, CourseController.removeCourse);


// Export the Router
module.exports = router;

