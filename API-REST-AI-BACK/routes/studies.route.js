const express = require('express')
const router = express.Router()
const StudiesController = require('../controllers/Studies/studies.controller');

// Authorize each API with middleware and map to the Controller Functions
/* GET studies listing. */
router.get('/test', function(req, res) {
    res.send('Llegaste a la ruta de studies');
  });
router.post('/create', StudiesController.createStudies);
router.get('/',Authorization, StudiesController.getStudies);
router.put('/', Authorization, StudiesController.updateStudies);
router.delete('/', Authorization, StudiesController.removeStudies);


// Export the Router
module.exports = router;
