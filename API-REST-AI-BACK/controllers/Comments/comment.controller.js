const CommentService = require('../../services/Comments/comment.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getComments = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Comments = await CommentService.getComments({}, page, limit)
        // Return the Comments list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Comments, message: "Succesfully Comments Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createComments = async function (req, res) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller", req.body)
    // var Comment = {
    //     key: Math.floor(Math.random() * 2147483647),
    //     autor: req.body.autor,
    //     descripcion: req.body.descripcion,
    // }

    //OBJETO SOLO CON EL DATO DEL COMENTARIO
    var Comment = {
        descripcion: req.body.descripcion,
    }

    try {
        // Calling the Service function with the new object from the Request Body
        var createdComment = await CommentService.createComment(Comment)
        return res.status(201).json({createdComment, message: "Succesfully Created Comment"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Comment Creation was Unsuccesfull"})
    }
}

exports.updateComment = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.descripcion) {
        return res.status(400).json({status: 400., message: "Name be present"})
    }

    
    var Comment = {
       
        key: req.body.key ? req.body.key : null,
        autor: req.body.autor ? req.body.autor : null,
        descripcion: req.body.descripcion ? req.body.descripcion : null
    }
    try {
        var updatedComment = await CommentService.updateComment(Comment)
        return res.status(200).json({status: 200, data: updatedComment, message: "Succesfully Updated Comment"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeComment = async function (req, res, next) {

    var id = req.body.key;
    try {
        var deleted = await CommentService.deleteComment(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

 
    
