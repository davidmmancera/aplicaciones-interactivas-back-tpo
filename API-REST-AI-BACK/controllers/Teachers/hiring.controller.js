var HiringService = require('../../services/Teachers/hiring.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getHiring = async function (req, res, next) {
    const query = {token: req.headers['x-access-token']};

    try {
        const cls = await HiringService.getHiring(query);
        // Return the Hiring list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: cls});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createHiring = async function (req, res) {
    // Req.Body contains the form submit values.
    const query = {token: req.headers['x-access-token']};
    console.log("Llegue al controller",req.body)
    var hiring = {        
        key: Math.floor(Math.random() * 2147483647),
        profesorKey: req.body.profesorKey,
        classKey: req.body.classKey,
        nombre: req.body.nombre,
        alumno: req.body.alumno,
        email: req.body.email,
        telefono: req.body.telefono,
        horaContacto: req.body.horaContacto,
        comentario: req.body.comentario,
        estado: 0
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdHiring = await HiringService.createHiring(query, hiring)
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
        email: req.body.email ? req.body.email : null,
        estado: req.body.estado ? req.body.estado : null    
    }
    try {
        var updatedHiring = await HiringService.updateHiring(hiring)
        return res.status(200).json({status: 200, data: updatedHiring, message: "Succesfully Updated Hiring"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.approveHire = async function (req, res, next) {
    const clase = {
        key: req.body.key,
        classKey: req.body.classKey,
        studentKey: req.body.studentKey,
        email: req.body.email,
        nombre: req.body.nombre
    };
    console.log(clase)
    try {
        await HiringService.approveHiring(clase);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.removeHiring = async function (req, res, next) {
    const clase = {
        key: req.body.key,
        email: req.body.email,
        nombre: req.body.nombre
    };
    try {
        await HiringService.deleteHiring(clase);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}





    
    
