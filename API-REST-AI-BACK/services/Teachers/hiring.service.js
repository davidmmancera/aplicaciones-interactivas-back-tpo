// Gettign the Newly created Mongoose Model we just created 
var Hiring = require('../../models/Teachers/hiring.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const User = require("../../models/Users/User.model");

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the student  List
exports.getHiring = async function (query) {
    // Try Catch the awaited promise to handle the error 
    try {
        // Return the students list that was retured by the mongoose promise
        const id = jwt.decode(query.token, {complete: true});
        const user = await User.findOne({_id: id.payload.id});
        return await Hiring.find({profesorKey: user.key});
    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error(e);
    }
}

exports.createHiring = async function (hiring) {
    
    var newHiring = new Hiring({
        key: hiring.key,
        profesorKey: hiring.profesorKey,
        classKey: hiring.classKey,
        nombre: hiring.nombre,
        alumno: hiring.alumno,
        email: hiring.email,
        telefono: hiring.telefono,
        horaContacto: hiring.horaContacto,
        comentario: hiring.comentario,
        estado: hiring.estado
    })

    try {
        // Saving the Hiring 
        var savedHiring = await newHiring.save();
        return savedHiring;
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
    oldHiring.alumno = hiring.alumno,
    oldHiring.email = hiring.email,
    oldHiring.estado = hiring.estado


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
