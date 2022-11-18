const express = require('express')
const router = express.Router()
const StudentClassesController = require('../controllers/Students/classes.controller');

// Authorize each API with middleware and map to the Controller Functions
/* GET students classes listing. */
router.get('/test', function(req, res) {
    res.send('Llegaste a la ruta de Students classes');
  });
router.post('/create', StudentClassesController.createClass);
router.get('/',Authorization, StudentClassesController.getClass);
router.put('/', Authorization, StudentClassesController.updateClass);
router.delete('/', Authorization, StudentClassesController.removeClass);


// Export the Router
module.exports = router;

