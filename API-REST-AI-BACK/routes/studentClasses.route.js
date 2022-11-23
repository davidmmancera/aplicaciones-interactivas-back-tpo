const express = require('express')
const router = express.Router()
const StudentClassesController = require('../controllers/Students/classes.controller');
var Authorization = require('../auth/authorization');
// Authorize each API with middleware and map to the Controller Functions
/* GET students classes listing. */
router.get('/testStudentsClasses', function(req, res) {
    res.send('Llegaste a la ruta de Students classes');
  });
router.post('/create', StudentClassesController.createClass);
router.get('/',Authorization, StudentClassesController.getClass);
router.get('/{id}',Authorization, StudentClassesController.getClassById);
router.put('/', Authorization, StudentClassesController.updateClass);
router.put('/', Authorization, StudentClassesController.qualifyClass);
router.delete('/', Authorization, StudentClassesController.removeClass);


// Export the Router
module.exports = router;

