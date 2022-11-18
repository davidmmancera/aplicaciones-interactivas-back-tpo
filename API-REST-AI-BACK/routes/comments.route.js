const express = require('express')
const router = express.Router()
const CommentController = require('../controllers/Comments/comment.controller');

// Authorize each API with middleware and map to the Controller Functions
/* GET comments listing. */
router.get('/testComments', function(req, res) {
    res.send('Llegaste a la ruta de comments');
  });
router.post('/create', CommentController.createComments);
router.get('/',Authorization, CommentController.getComments);
router.put('/', Authorization, CommentController.updateComment);
router.delete('/', Authorization, CommentController.removeComment);


// Export the Router
module.exports = router;

