const express = require('express')
const router = express.Router()
const TeacherClassCommentController = require('../controllers/Teachers/classComment.controller');
var Authorization = require('../auth/authorization');
// Authorize each API with middleware and map to the Controller Functions
/* GET teacher classes comment listing. */
router.get('/testTeacherClassComment', function(req, res) {
    res.send('Llegaste a la ruta de Teacher classes comment');
  });
router.post('/create', TeacherClassCommentController.createClassComment);
router.get('/', Authorization, TeacherClassCommentController.getClassComment);
router.get('/acceptedComment', Authorization, TeacherClassCommentController.getAcceptedComment);
router.put('/', Authorization, TeacherClassCommentController.updateClassComment);
router.delete('/', Authorization, TeacherClassCommentController.removeClassComment);

// Export the Router
module.exports = router;

