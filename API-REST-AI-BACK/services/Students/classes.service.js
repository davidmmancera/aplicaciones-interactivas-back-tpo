// Gettign the Newly created Mongoose Model we just created 
var Class = require('../../models/Students/classes.model');
var Qualification = require('../../models/others/Qualifications.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const User = require("../../models/Users/User.model");

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the student  List
exports.getClass = async function (query) {
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        const id = jwt.decode(query.token, {complete: true});
        const user = await User.findOne({_id: id.payload.id});
        // Return the students list that was retured by the mongoose promise
        return await Class.find({studentKey: user.key});

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

exports.getClasByFilter = async function (query, page, limit) {
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
        studentKey: cls.studentKey,
        materia: cls.materia,
        frecuencia: cls.frecuencia
    })

    try {
        // Saving the class
        return await newClass.save();
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
    if (!oldClass) {
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
    
    var id = {key : qualify.key}

    try {
        //Find the old Student Object by the Id
        var oldClass = await Class.findOne(id);
    } catch (e) {
        throw Error("Error occured while Finding the class")
    }
    // If no old Student Object exists return false
    if (!oldClass) {
        return false;
    }

    oldClass.key = qualify.key;
    oldClass.calificacionId = qualify.calificacionId;
    oldClass.calificacion = qualify.calificacion

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
