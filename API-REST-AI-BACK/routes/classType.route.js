const express = require('express')
const router = express.Router()
const ClassTypeController = require('../controllers/others/classType.controller');

// Authorize each API with middleware and map to the Controller Functions
/* GET classType listing. */
router.get('/test', function(req, res) {
    res.send('Llegaste a la ruta de classType');
  });
router.get('/',Authorization, ClassTypeController.getClassType);
router.post('/create', ClassTypeController.createClassType);
router.put('/', Authorization, ClassTypeController.updateClassType);
router.delete('/', Authorization, ClassTypeController.removeClassType);


// Export the Router
module.exports = router;

