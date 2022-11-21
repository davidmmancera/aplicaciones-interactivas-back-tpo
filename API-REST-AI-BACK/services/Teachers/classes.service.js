// Gettign the Newly created Mongoose Model we just created 
var Class = require('../../models/Teachers/classes.model');
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

exports.createClass = async function (cls) {
    
    var newClass = new Class({
        key: cls.key,
        nombre: cls.nombre,
        materia: cls.materia,
        duracion: cls.duracion,
        frecuencia: cls.frecuencia,
        costo: cls.costo
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
    
    var id = {key :cls.key}

    try {
        //Find the old Student Object by the Id
        var oldClass = await Class.findOne(id);
    } catch (e) {
        throw Error("Error occured while Finding the Student")
    }
    // If no old Student Object exists return false
    console.log(oldClass)
    if (!oldClass) {
        return false;
    }

    oldClass.key = cls.key
    oldClass.nombre = cls.nombre
    oldClass.materia = cls.materia
    oldClass.duracion = cls.duracion
    oldClass.frecuencia = cls.frecuencia
    oldClass.costo = cls.costo


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
        var deleted = await Class.remove({key: id})
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Class Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Class")
    }
}
