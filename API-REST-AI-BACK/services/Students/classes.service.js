// Gettign the Newly created Mongoose Model we just created 
var Class = require('../../models/Students/classes.model');
var Qualification = require('../../models/others/Qualifications.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the student  List
exports.getClass = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        var Classes = await Class.paginate(query, options)
        // Return the students list that was retured by the mongoose promise
        return Classes;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Classes');
    }
}

exports.getClassById = async function (query, page, limit) {
    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        var Classes = await Class.paginate(query, options)
        // Return the students list that was retured by the mongoose promise
        return Classes;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Classes');
    }
}

exports.createClass = async function (cls) {
    
    var newClass = new Class({
        key: cls.key,
        materiaId: cls.materiaId,
        materiaNombre: cls.materiaNombre,
        materiaDescription: cls.materiaDescription,
        tipoClaseId: cls.tipoClaseId,
        tipoClaseDescripcion: cls.tipoClaseDescripcion,
        frecuenciaId: cls.frecuenciaId,
        frecuenciaDescripcion: cls.frecuenciaDescripcion,
        calificacionId: cls.calificacionId,
        calificacion: cls.calificacion,
        costo: cls.costo,
        activo: cls.activo
    })

    try {
        // Saving the class 
        var savedClass = await newClass.save();
        var token = jwt.sign({
            id: savedClass._key
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating Class")
    }
}

exports.updateClass = async function (cls) {
    
    var id = {value :cls.value}

    try {
        //Find the old Student Object by the Id
        var oldClass = await Class.findOne(id);
    } catch (e) {
        throw Error("Error occured while Finding the Student")
    }
    // If no old Student Object exists return false
    if (!oldStudent) {
        return false;
    }

    oldClass.key = cls.key,
    oldClass.materiaId = cls.materiaId,
    oldClass.materiaNombre = cls.materiaNombre,
    oldClass.materiaDescription = cls.materiaDescription,
    oldClass.tipoClaseId = cls.tipoClaseId,
    oldClass.tipoClaseDescripcion = cls.tipoClaseDescripcion,
    oldClass.frecuenciaId = cls.frecuenciaId,
    oldClass.frecuenciaDescripcion = cls.frecuenciaDescripcion,
    oldClass.calificacionId = cls.calificacionId,
    oldClass.calificacion = cls.calificacion,
    oldClass.costo = cls.costo,
    oldClass.activo = cls.activo

    try {
        var savedClass = await oldClass.save()
        return savedClass;
    } catch (e) {
        throw Error("And Error occured while updating the Class");
    }
}

exports.qualifyClass = async function (qualify) {
    
    try {
        //Find the old Student Object by the Id
        var oldClass = await Class.findOne(id);
    } catch (e) {
        throw Error("Error occured while Finding the Student")
    }
    // If no old Student Object exists return false
    if (!oldStudent) {
        return false;
    }

    oldClass.key = qualify.keyClass,
    oldClass.calificacion = qualify.qualify

    try {
        var savedClass = await oldClass.save()
        return savedClass;
    } catch (e) {
        throw Error("And Error occured while updating the Class");
    }
}

exports.deleteClass = async function (id) {

    // Delete the Class
    try {
        var deleted = await Class.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Class Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Class")
    }
}
