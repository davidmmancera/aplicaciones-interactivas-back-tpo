var FrequencyService = require('../../services/others/frequency.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getFrequency = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var frequency = await FrequencyService.getFrequency({}, page, limit)
        // Return the Frequencies list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: frequency, message: "Succesfully Frequency Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createFrequency = async function (req, res) {
    // Req.Body contains the form submit values.
    console.log("Llegue al controller",req.body)
    var Frequency = {
        value: req.body.value,
        label: req.body.label,
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdFrequency = await FrequencyService.createFrequency(Frequency)
        return res.status(201).json({createdFrequency, message: "Succesfully Created Frequency"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Frequency Creation was Unsuccesfull"})
    }
}

exports.updateFrequency = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.label) {
        return res.status(400).json({status: 400., message: "Label be present"})
    }

    
    var Frequency = {       
        value: req.body.value ? req.body.value : null,
        label: req.body.label ? req.body.label : null
    }
    try {
        var updatedFrequency = await FrequencyService.updateFrequency(Frequency)
        return res.status(200).json({status: 200, data: updatedFrequency, message: "Succesfully Updated Frequency"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeFrequency = async function (req, res, next) {

    var id = req.params.value;
    try {
        var deleted = await FrequencyService.deleteFrequency(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}





    
    
