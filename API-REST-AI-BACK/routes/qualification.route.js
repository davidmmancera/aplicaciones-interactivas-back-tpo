const express = require('express')
const router = express.Router()
const QualificationController = require('../controllers/others/qualification.controller');
var Authorization = require('../auth/authorization');
// Authorize each API with middleware and map to the Controller Functions
/* GET qualification listing. */
router.get('/testQualification', function(req, res) {
    res.send('Llegaste a la ruta de qualification');
  });
router.get('/',Authorization, QualificationController.getQualification);
router.post('/create', QualificationController.createQualification);
router.put('/', Authorization, QualificationController.updateQualification);
router.delete('/', Authorization, QualificationController.removeQualification);


// Export the Router
module.exports = router;

