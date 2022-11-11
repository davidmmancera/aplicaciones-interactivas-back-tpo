var ClassTypeService = require('../../services/others/classType.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getClassType = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var ClassType = await ClassTypeService.getClassType({}, page, limit)
        // Return the ClassTypes list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: ClassType, message: "Succesfully ClassType Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createClassType = async function (req, res) {
    // Req.Body contains the form submit values.
    console.log("Llegue al controller",req.body)
    var ClassType = {
        value: req.body.value,
        label: req.body.label,
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdClassType = await ClassTypeService.createClassType(ClassType)
        return res.status(201).json({createdClassType, message: "Succesfully Created ClassType"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "ClassType Creation was Unsuccesfull"})
    }
}

exports.updateClassType = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.label) {
        return res.status(400).json({status: 400., message: "Label be present"})
    }

    
    var ClassType = {       
        value: req.body.value ? req.body.value : null,
        label: req.body.label ? req.body.label : null
    }
    try {
        var updatedClassType = await ClassTypeService.updateClassType(ClassType)
        return res.status(200).json({status: 200, data: updatedClassType, message: "Succesfully Updated ClassType"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeClassType = async function (req, res, next) {

    var id = req.params.value;
    try {
        var deleted = await ClassTypeService.deleteClassType(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}





    
    
