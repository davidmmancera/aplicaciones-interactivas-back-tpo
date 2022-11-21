var QualificationService = require('../../services/others/qualifications.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getQualification = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var qualifications = await QualificationService.getQualification({}, page, limit)
        // Return the Qualification list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: qualifications, message: "Succesfully qualifications Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createQualification = async function (req, res) {
    // Req.Body contains the form submit values.
    console.log("Llegue al controller",req.body)
    var Qualification = {
        value: req.body.value,
        label: req.body.label,
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdQualification = await QualificationService.createQualification(Qualification)
        return res.status(201).json({createdQualification, message: "Succesfully Created Qualification"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Qualification Creation was Unsuccesfull"})
    }
}

exports.updateQualification = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.label) {
        return res.status(400).json({status: 400., message: "Label be present"})
    }

    
    var Qualification = {       
        value: req.body.value ? req.body.value : null,
        label: req.body.label ? req.body.label : null
    }
    try {
        var updatedQualification = await QualificationService.updateQualification(Qualification)
        return res.status(200).json({status: 200, data: updatedQualification, message: "Succesfully Updated Qualification"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeQualification = async function (req, res, next) {

    var id = req.params.value;
    try {
        var deleted = await QualificationService.deleteQualification(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}





    
    
