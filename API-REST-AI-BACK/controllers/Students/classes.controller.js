var ClassService = require('../../services/Students/classes.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getClass = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var cls = await ClassService.getClass({}, page, limit)
        // Return the Classes list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: cls, message: "Succesfully Class Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createClass = async function (req, res) {
    // Req.Body contains the form submit values.
    console.log("Llegue al controller",req.body)
    var cls = {        
        key: Math.floor(Math.random() * 2147483647),
        materiaId: req.body.materiaId,
        materiaNombre: req.body.materiaNombre,
        materiaDescription: req.body.materiaDescription,
        tipoClaseId: req.body.tipoClaseId,
        tipoClaseDescripcion: req.body.tipoClaseDescripcion,
        frecuenciaId: req.body.frecuenciaId,
        frecuenciaDescripcion: req.body.frecuenciaDescripcion,
        calificacionId: req.body.calificacionId,
        calificacion: req.body.calificacion,
        costo: req.body.costo
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdClass = await ClassService.createClass(cls)
        return res.status(201).json({createdClass, message: "Succesfully Created Class"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Class Creation was Unsuccesfull"})
    }
}

exports.updateClass = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.label) {
        return res.status(400).json({status: 400., message: "Label be present"})
    }

    
    var cls = {       
        key: req.body.value ? req.body.value : null,
        materiaId: req.body.materiaId ? req.body.materiaId : null,
        materiaNombre: req.body.materiaNombre ? req.body.materiaNombre : null,
        materiaDescription: req.body.materiaDescription ? req.body.materiaDescription : null,
        tipoClaseId: req.body.tipoClaseId ? req.body.tipoClaseId : null,
        tipoClaseDescripcion: req.body.tipoClaseDescripcion ? req.body.tipoClaseDescripcion : null,
        frecuenciaId: req.body.frecuenciaId ? req.body.frecuenciaId : null,
        frecuenciaDescripcion: req.body.frecuenciaDescripcion ? req.body.frecuenciaDescripcion : null,
        calificacionId: req.body.calificacionId ? req.body.calificacionId : null,
        calificacion: req.body.calificacion ? req.body.calificacion : null,
        costo: req.body.costo ? req.body.costo : null
    }
    try {
        var updatedClass = await ClassService.updateClass(cls)
        return res.status(200).json({status: 200, data: updatedClass, message: "Succesfully Updated Class"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeClass = async function (req, res, next) {

    var id = req.params.value;
    try {
        var deleted = await ClassService.deleteClass(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}





    
    
