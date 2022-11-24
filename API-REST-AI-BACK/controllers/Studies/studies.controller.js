var StudiesService = require('../../services/Studies/studies.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getStudies = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    // var page = req.query.page ? req.query.page : 1
    // var limit = req.query.limit ? req.query.limit : 10;
    
    try {
        var studies = await StudiesService.getStudies({})
        // Return the Frequencies list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: studies, message: "Succesfully Studies Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createStudies = async function (req, res) {
    // Req.Body contains the form submit values.
    console.log("Llegue al controller",req.body)
    var Studies = {
        value: req.body.value,
        label: req.body.label,
        description: req.body.description,
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdStudies = await StudiesService.createStudies(Studies)
        return res.status(201).json({createdStudies, message: "Succesfully Created Studies"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Studies Creation was Unsuccesfull"})
    }
}

exports.updateStudies = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.label) {
        return res.status(400).json({status: 400., message: "Label be present"})
    }

    
    var Studies = {       
        value: req.body.value ? req.body.value : null,
        label: req.body.label ? req.body.label : null,
        description: req.body.description ? req.body.description : null
    }
    try {
        var updatedStudies = await StudiesService.updateStudies(Studies)
        return res.status(200).json({status: 200, data: updatedStudies, message: "Succesfully Updated Studies"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeStudies = async function (req, res, next) {

    var id = req.params.value;
    try {
        var deleted = await StudiesService.deleteStudies(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}





    
    
