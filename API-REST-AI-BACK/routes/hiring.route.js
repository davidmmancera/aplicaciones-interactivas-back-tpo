const express = require('express')
const router = express.Router()
const HiringController = require('../controllers/Teachers/hiring.controller');

// Authorize each API with middleware and map to the Controller Functions
/* GET hiring listing. */
router.get('/testHiring', function(req, res) {
    res.send('Llegaste a la ruta de hiring');
  });
router.get('/',Authorization, HiringController.getHiring);
router.post('/create', HiringController.createHiring);
router.put('/', Authorization, HiringController.updateHiring);
router.delete('/', Authorization, HiringController.removeHiring);


// Export the Router
module.exports = router;

