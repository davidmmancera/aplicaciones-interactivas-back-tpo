const express = require('express')
const router = express.Router()
const StudentClassCommentController = require('../controllers/Students/classComment.controller');
var Authorization = require('../auth/authorization');
// Authorize each API with middleware and map to the Controller Functions
/* GET students classes comment listing. */
router.get('/testStudentClassComment', function(req, res) {
    res.send('Llegaste a la ruta de Students classes comment');
  });
router.post('/create', StudentClassCommentController.createClassComment);
router.get('/', Authorization, StudentClassCommentController.getClassComment);
router.put('/', Authorization, StudentClassCommentController.updateClassComment);
router.delete('/', Authorization, StudentClassCommentController.removeClassComment);

// Export the Router
module.exports = router;

