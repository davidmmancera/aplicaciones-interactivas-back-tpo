// Gettign the Newly created Mongoose Model we just created 
var Course = require('../../models/others/Courses.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the Course  List
exports.getCourse = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        var course = await Course.paginate(query, options)
        // Return the students list that was retured by the mongoose promise
        return course;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Course');
    }
}

exports.createCourse = async function (course) {
    // Creating a new Mongoose Object by using the new

    var newCourse = new Course({
        value: course.value,
        label: course.label,
        description: course.description
    })

    try {
        // Saving the Course 
        var savedCourse = await newCourse.save();
        var token = jwt.sign({
            id: savedCourse._value
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating Course")
    }
}

exports.updateCourse = async function (course) {
    
    var id = {value :  course.value}

    try {
        //Find the old Course Object by the Id
        var oldCourse = await Course.findOne(id);
    } catch (e) {
        throw Error("Error occured while Finding the Course")
    }
    // If no old Course Object exists return false
    if (!oldCourse) {
        return false;
    }
    //Edit the Course Object
    oldCourse.value = course.value
    oldCourse.label = course.label
    oldCourse.description = course.description

    try {
        var savedCourse = await oldCourse.save()
        return savedCourse;
    } catch (e) {
        throw Error("And Error occured while updating the Course");
    }
}

exports.deleteCourse = async function (id) {

    // Delete the Course
    try {
        var deleted = await Course.remove({
            _value: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Course Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Course")
    }
}


