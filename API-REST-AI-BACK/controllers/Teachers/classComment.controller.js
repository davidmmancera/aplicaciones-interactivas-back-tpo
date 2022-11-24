var ClassCommentService = require('../../services/Teachers/classComment.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getClassComment = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var classComment = await ClassCommentService.getClassComment({}, page, limit)
        // Return the Frequencies list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: classComment, message: "Succesfully ClassComment Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getAcceptedComment = async function (req, res) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    let filtro= {estado: 1} //ACEPTADOS
    try {
        var Students = await ClassCommentService.getClassComment(filtro, page, limit)
        // Return the Students list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Students, message: "Succesfully Students Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createClassComment = async function (req, res) {
    // Req.Body contains the form submit values.
    console.log("Llegue al controller",req.body)
    var ClassComment = {
        value: req.body.value,
        label: req.body.label,
        estado: req.body.estado
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdClassComment = await ClassCommentService.createClassComment(ClassComment)
        return res.status(201).json({createdClassComment, message: "Succesfully Created ClassComment"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "ClassComment Creation was Unsuccesfull"})
    }
}

exports.updateClassComment = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.label) {
        return res.status(400).json({status: 400., message: "Label be present"})
    }

    
    var ClassComment = {       
        keyClass: req.body.keyClass ? req.body.keyClass : null,
        comment: req.body.comment ? req.body.comment : null,
        estado: req.body.estado ? req.body.estado : null
    }
    try {
        var updatedClassComment = await ClassCommentService.updateClassComment(ClassComment)
        return res.status(200).json({status: 200, data: updatedClassComment, message: "Succesfully Updated ClassComment"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeClassComment = async function (req, res, next) {

    var id = req.params.value;
    try {
        var deleted = await ClassCommentService.deleteClassComment(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}





    
    
