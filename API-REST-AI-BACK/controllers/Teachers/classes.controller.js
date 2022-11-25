var ClassService = require('../../services/Teachers/classes.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getClass = async function (req, res, next) {
    let query = {}

    if (req.headers['key']) {
        query = {key: req.headers['key']}
    }

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 100;
    try {
        var cls = await ClassService.getClass(query, page, limit)
        // Return the Classes list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: cls, message: "Succesfully Class Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

// Async Controller function to get the To do List
exports.getFilters = async function (req, res, next) {
    try {
        const cls = await ClassService.getFilters();
        // Return the Classes list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: cls});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getClassById = async function (req, res, next) {
    let query = {key: req.headers['key']};
    try {
        const cls = await ClassService.getClassById(query);
        // Return the Classes list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: cls, message: "Succesfully Class Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getClassByFilter = async function (req, res) {
    // Check the existence of the query parameters, If doesn't exists assign a default value
    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 10;
    let filtro = {
        materia: req.body.materia,
        tipo: req.body.tipo,
        frecuencia: req.body.frecuencia,
        calificacion: req.body.calificacion
    }

    try {
        const cls = await ClassService.getClassByFilter(filtro, page, limit);
        // Return the Class list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: cls, message: "Succesfully Class Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createClass = async function (req, res) {
    // Req.Body contains the form submit values.
    console.log("Llegue al controller",req.body)
    let key = Math.floor(Math.random() * 2147483647)
    var cls = {        
        key: key,
        nombre: req.body.nombre,
        materia: req.body.materia,
        duracion: req.body.duracion,
        frecuencia: req.body.frecuencia,
        costo: req.body.costo,
        activo: req.body.activo
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
    if (!req.body.key) {
        return res.status(400).json({status: 400., message: "Label be present"})
    }
    
    var cls = {       
        key: req.body.key ? req.body.key : null,
        nombre: req.body.nombre ? req.body.nombre : null,
        materia: req.body.materia ? req.body.materia : null,
        duracion: req.body.duracion ? req.body.duracion : null,
        frecuencia: req.body.frecuencia ? req.body.frecuencia : null,
        costo: req.body.costo ? req.body.costo : null,
        activo: req.body.activo ? req.body.activo : 0,
    }
    try {
        var updatedClass = await ClassService.updateClass(cls)
        return res.status(200).json({status: 200, data: updatedClass, message: "Succesfully Updated Class"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeClass = async function (req, res, next) {

    var id = req.body.key;
    console.log(id)
    try {
        var deleted = await ClassService.deleteClass(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.pauseClass = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.key) {
        return res.status(400).json({status: 400., message: "Label be present"})
    }
    
    var cls = {       
        key: req.body.key ? req.body.key : null,
        nombre: req.body.nombre ? req.body.nombre : null,
        materia: req.body.materia ? req.body.materia : null,
        duracion: req.body.duracion ? req.body.duracion : null,
        frecuencia: req.body.frecuencia ? req.body.frecuencia : null,
        costo: req.body.costo ? req.body.costo : null,
        activo: 0, //AQUI SE PAUSA LA CLASE
    }
    try {
        var updatedClass = await ClassService.updateClass(cls)
        return res.status(200).json({status: 200, data: updatedClass, message: "Succesfully Updated Class"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.activeClass = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.key) {
        return res.status(400).json({status: 400., message: "Label be present"})
    }
    
    var cls = {       
        key: req.body.key ? req.body.key : null,
        nombre: req.body.nombre ? req.body.nombre : null,
        materia: req.body.materia ? req.body.materia : null,
        duracion: req.body.duracion ? req.body.duracion : null,
        frecuencia: req.body.frecuencia ? req.body.frecuencia : null,
        costo: req.body.costo ? req.body.costo : null,
        activo: 1, //AQUI SE ACTIVA LA CLASE
    }
    try {
        var updatedClass = await ClassService.updateClass(cls)
        return res.status(200).json({status: 200, data: updatedClass, message: "Succesfully Updated Class"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}





    
    
