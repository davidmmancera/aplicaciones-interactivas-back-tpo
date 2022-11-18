const express = require('express')
const router = express.Router()
const FrequencyController = require('../controllers/others/frequency.controller');
var Authorization = require('../auth/authorization');
// Authorize each API with middleware and map to the Controller Functions
/* GET frequency listing. */
router.get('/testFrequency', function(req, res) {
    res.send('Llegaste a la ruta de frequency');
  });
router.get('/',Authorization, FrequencyController.getFrequency);
router.post('/create', FrequencyController.createFrequency);
router.put('/', Authorization, FrequencyController.updateFrequency);
router.delete('/', Authorization, FrequencyController.removeFrequency);


// Export the Router
module.exports = router;

