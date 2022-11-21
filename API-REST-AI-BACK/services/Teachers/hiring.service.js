// Gettign the Newly created Mongoose Model we just created 
var Hiring = require('../../models/Teachers/hiring.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the student  List
exports.getHiring = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        var hiring = await Hiring.paginate(query, options)
        // Return the students list that was retured by the mongoose promise
        return hiring;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating hiring');
    }
}

exports.createHiring = async function (hiring) {
    
    var newHiring = new Hiring({
        key: hiring.key,
        nombre: hiring.nombre,
        alumno: hiring.alumno,
        estado: hiring.estado
    })

    try {
        // Saving the Hiring 
        var savedHiring = await newHiring.save();
        var token = jwt.sign({
            id: savedHiring._key
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating Hiring")
    }
}

exports.updateHiring = async function (hiring) {
    
    var id = {key :hiring.key}

    try {
        //Find the old Hiring Object by the Id
        var oldHiring = await Hiring.findOne(id);
    } catch (e) {
        throw Error("Error occured while Finding the Hiring")
    }
    // If no old Hiring Object exists return false
    if (!oldHiring) {
        return false;
    }

    oldHiring.key = hiring.key,
    oldHiring.nombre = hiring.nombre,
    oldHiring.materia = hiring.materia,
    oldHiring.duracion = hiring.duracion,
    oldCloldHiringass.frecuencia = hiring.frecuencia,
    oldHiring.costo = hiring.costo


    try {
        var savedHiring = await oldHiring.save()
        return savedHiring;
    } catch (e) {
        throw Error("And Error occured while updating the Hiring");
    }
}

exports.deleteHiring = async function (id) {

    // Delete the Hiring
    try {
        var deleted = await Hiring.remove({key: id})
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Hiring Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Hiring")
    }
}
