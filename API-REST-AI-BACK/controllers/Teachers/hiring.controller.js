var HiringService = require('../../services/Teachers/hiring.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getHiring = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var cls = await HiringService.getHiring({}, page, limit)
        // Return the Hiring list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: cls, message: "Succesfully Hiring Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createHiring = async function (req, res) {
    // Req.Body contains the form submit values.
    console.log("Llegue al controller",req.body)
    var hiring = {        
        key: Math.floor(Math.random() * 2147483647),
        nombre: req.body.nombre,
        alumno: req.body.alumno,
        estado: req.body.estado
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdHiring = await HiringService.createHiring(hiring)
        return res.status(201).json({createdHiring, message: "Succesfully Created Hiring"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Hiring Creation was Unsuccesfull"})
    }
}

exports.updateHiring = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.key) {
        return res.status(400).json({status: 400., message: "Label be present"})
    }

    
    var hiring = {       
        key: req.body.value ? req.body.value : null,
        nombre: req.body.nombre ? req.body.nombre : null,
        alumno: req.body.alumno ? req.body.alumno : null,
        estado: req.body.estado ? req.body.estado : null    
    }
    try {
        var updatedHiring = await HiringService.updateHiring(hiring)
        return res.status(200).json({status: 200, data: updatedHiring, message: "Succesfully Updated Hiring"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeHiring = async function (req, res, next) {

    var id = req.params.key;
    try {
        var deleted = await HiringService.deleteHiring(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}





    
    
