// Gettign the Newly created Mongoose Model we just created 
var Class = require('../../models/Teachers/classes.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

exports.getClasses = async function (query, page, limit) {
    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error
    try {
        console.log("Query",query)
        // Return the students list that was retured by the mongoose promise
        return await Class.paginate(query, options);

    } catch (e) {
        // return a Error message describing the reason
        console.log("error services",e)
        throw Error('Error while Paginating Classes');
    }
}

// Async function to get the student  List
exports.getClass = async function (query) {

    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        // Return the students list that was retured by the mongoose promise
        return  await Class.findOne(query)
    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Classes');
    }
}

exports.getFilters = async function (query) {
    // Try Catch the awaited promise to handle the error
    const subjets = await Class.distinct("materia");
    const type = await Class.distinct("tipo");
    const frequency = await Class.distinct("frecuencia");
    const qualification = await Class.distinct("calificacion");
    const filters = {
        materias: subjets,
        tipo: type,
        frecuencia: frequency,
        calificacion: qualification
    }

    try {
        // Return the students list that was retured by the mongoose promise
        return filters
    } catch (e) {
        // return a Error message describing the reason
        console.log("error services",e)
        throw Error('Error while Paginating Classes');
    }
}

exports.getClassById = async function (query) {
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        // Return the students list that was retured by the mongoose promise
        return await Class.findOne(query);

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Classes');
    }
}

exports.getClassByFilter = async function (query, page, limit) {
    // Options setup for the mongoose paginate
    const options = {
        page,
        limit
    };
    // Try Catch the awaited promise to handle the error
    try {
        console.log("Query",query)
        // Return the students list that was retured by the mongoose promise
        return await Class.paginate(query, options);

    } catch (e) {
        // return a Error message describing the reason
        console.log("error services",e)
        throw Error('Error while Paginating Classes');
    }
}

exports.createClass = async function (cls) {
    const newClass = new Class({
        key: cls.key,
        profesorKey: cls.profesorKey,
        calificacion: "Buena",
        profesor: cls.profesor,
        experiencia: cls.experiencia,
        descripcion: cls.descripcion,
        nombre: cls.nombre,
        materia: cls.materia,
        duracion: cls.duracion,
        frecuencia: cls.frecuencia,
        costo: cls.costo,
        activo: 1
    });

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
    oldClass.costo = cls.costo,
    oldClass.activo = cls.activo


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
