// Gettign the Newly created Mongoose Model we just created 
var Teacher = require('../models/Teacher.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the Teacher  List
exports.getTeachers = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        var Teachers = await Teacher.paginate(query, options)
        // Return the teachers list that was retured by the mongoose promise
        return Teachers;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Teachers');
    }
}

exports.createTeacher = async function (teacher) {
    // Creating a new Mongoose Object by using the new keyword
    var hashedPassword = bcrypt.hashSync(Teacher.password, 8);
    
    var newTeacher = new Teachers({
        name: teacher.name,
        email: teacher.email,
        date: new Date(),
        password: hashedPassword
    })

    try {
        // Saving the Teacher 
        var savedTeacher = await newTeacher.save();
        var token = jwt.sign({
            id: savedTeacher._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating Teacher")
    }
}

exports.updateTeacher = async function (teacher) {
    
    var id = {name :teacher.name}

    try {
        //Find the old Teacher Object by the Id
        var oldTeacher = await Teacher.findOne(id);
    } catch (e) {
        throw Error("Error occured while Finding the Teacher")
    }
    // If no old Teacher Object exists return false
    if (!oldTeacher) {
        return false;
    }
    //Edit the Teacher Object
    var hashedPassword = bcrypt.hashSync(Teacher.password, 8);
    oldTeacher.name = Teacher.name
    oldTeacher.email = Teacher.email
    oldTeacher.password = hashedPassword
    try {
        var savedTeacher = await oldTeacher.save()
        return savedTeacher;
    } catch (e) {
        throw Error("And Error occured while updating the Teacher");
    }
}

exports.deleteTeacher = async function (id) {

    // Delete the Teacher
    try {
        var deleted = await Teacher.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Teacher Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Teacher")
    }
}


exports.loginTeacher = async function (teacher) {

    // Creating a new Mongoose Object by using the new keyword
    try {
        // Find the Teacher 
        console.log("login:", teacher)
        var _details = await Teacher.findOne({
            email: teacher.email
        });
        var passwordIsValid = bcrypt.compareSync(teacher.password, _details.password);
        if (!passwordIsValid) return 0;

        var token = jwt.sign({
            id: _details._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return {token:token, teacher:_details};
    } catch (e) {
        // return a Error message describing the reason     
        throw Error("Error while Login Teacher")
    }

}