const express = require('express')
const router = express.Router()
const TeacherClassesController = require('../controllers/Teachers/classes.controller');
var Authorization = require('../auth/authorization');
// Authorize each API with middleware and map to the Controller Functions
/* GET teachers classes listing. */
router.get('/testTeachersClasses', function(req, res) {
    res.send('Llegaste a la ruta de teachers classes');
  });
router.post('/create', TeacherClassesController.createClass);
router.get('/',Authorization, TeacherClassesController.getClass);
router.get('/filters',Authorization, TeacherClassesController.getFilters);
router.get('/{id}',Authorization, TeacherClassesController.getClassById);
router.put('/', Authorization, TeacherClassesController.updateClass);
router.delete('/', Authorization, TeacherClassesController.removeClass);


// Export the Router
module.exports = router;

