// Gettign the Newly created Mongoose Model we just created 
var Hiring = require('../../models/Teachers/hiring.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const User = require("../../models/Users/User.model");
const TeacherClass = require('../../models/Teachers/classes.model');
const Class = require('../../models/Students/classes.model');
const nodemailer = require("nodemailer");

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

exports.createHiring = async function (query, hiring) {
    try {
        const id = jwt.decode(query.token, {complete: true});
        const user = await User.findOne({_id: id.payload.id});
        var newHiring = new Hiring({
            key: hiring.key,
            profesorKey: hiring.profesorKey,
            classKey: hiring.classKey,
            studentKey: user.key,
            nombre: hiring.nombre,
            alumno: hiring.alumno,
            email: hiring.email,
            telefono: hiring.telefono,
            horaContacto: hiring.horaContacto,
            comentario: hiring.comentario,
            estado: hiring.estado
        })
        // Saving the Hiring 

        return await newHiring.save();
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

exports.approveHiring = async function (hiring) {
    // Delete the Hiring
    try {
        const deleted = await Hiring.remove({key: hiring.key});
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Hiring Could not be deleted")
        }
        // const classes = await TeacherClass.findOne({key: clase.classKey})
        console.log(hiring)
        var newHiringApprove = new Hiring({
            key: Math.floor(Math.random() * 2147483647),
            classKey: hiring.key,
            profesorKey: hiring.profesorKey,
            studentKey: hiring.studentKey,
            alumno: hiring.alumno,
            nombre: hiring.nombre,
            estado: hiring.estado,
            horaContacto: hiring.horaContacto,
            email: hiring.email,
            telefono: hiring.telefono,
            comentario: hiring.comentario
        })

        var response = await newHiringApprove.save();
        console.log("Save")
        console.log(response)

        await sendEmailHiring({
            email: hiring.email,
            nombre: hiring.nombre,
            estado: "Aprobado"
        })
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Hiring")
    }
}

exports.deleteHiring = async function (clase) {
    // Delete the Hiring
    try {
        const deleted = await Hiring.remove({key: clase.key});
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Hiring Could not be deleted")
        }
        await sendEmailHiring({
            email: clase.email,
            nombre: clase.nombre,
            estado: "Rechazado"
        })
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Hiring")
    }
}

sendEmailHiring = async function (hire){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {user: 'userInstitular@gmail.com', pass: 'vbhhonlkashvaexw'}
    });
    const mailOptions = {
        from: 'userinstitular@gmail.com',
        to: hire.email,
        subject: "Respuesta sobre contratación de curso",
        html: '<div>' +
            '<p>Hola:</p>\n' +
            '<p>Su petición sobre el curso:  ' + hire.nombre + ' </p>\n' +
            '<p>Es:  ' + hire.estado + '</p>\n' +
            '<p>Si no solicitaste ningún curso, puedes ignorar este correo electrónico.</p>\n' +
            '<p>Gracias.</p>\n' +
            '<p>El equipo de Institular</p>' +
            '</div>'
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch(error) {
        throw Error("Mail not sent")
    }
};
