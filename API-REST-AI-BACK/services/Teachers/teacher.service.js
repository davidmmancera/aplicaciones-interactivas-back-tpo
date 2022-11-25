// Gettign the Newly created Mongoose Model we just created 
var Teacher = require('../../models/Teachers/Teacher.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const User = require("../../models/Users/User.model");

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the Teacher  List
exports.getTeacher = async function (query) {
    // Try Catch the awaited promise to handle the error 
    try {
        const id = jwt.decode(query.token, {complete: true});
        const user = await User.findOne({_id: id.payload.id});
        // Return the teachers list that was retured by the mongoose promise
        return await Teacher.findOne({key: user.key});
    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Teachers');
    }
}

exports.createTeacher = async function (teacher) {
    // Creating a new Mongoose Object by using the new keyword
    const hashedPassword = bcrypt.hashSync(teacher.password, 8);
    let key = Math.floor(Math.random() * 2147483647)
    const newUser = new User({
        key: key,
        type: "teacher",
        name: teacher.name,
        email: teacher.email,
        date: new Date(),
        password: hashedPassword
    });
    const newTeacher = new Teacher({
        key: key,
        name: teacher.name,
        email: teacher.email,
        date: new Date(),
        password: hashedPassword,
        phone: teacher.phone,
        title: teacher.title,
        experience: teacher.experience
    });

    try {
        // Saving the Teacher
        const savedUser = await newUser.save();
        newTeacher.save();
        return jwt.sign({
            id: savedUser._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while creating teacher")
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
    var hashedPassword = bcrypt.hashSync(teacher.password, 8);
    oldTeacher.name = teacher.name
    oldTeacher.email = teacher.email
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
            email: teacher.email,
            password: teacher.password
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