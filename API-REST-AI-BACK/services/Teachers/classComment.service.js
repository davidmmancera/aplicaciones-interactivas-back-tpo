// Gettign the Newly created Mongoose Model we just created 
var ClassComment = require('../../models/Teachers/ClassComment.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the ClassComment  List
exports.getClassComment = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        var classcomment = await ClassComment.paginate(query, options)
        // Return the students list that was retured by the mongoose promise
        return classcomment;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating ClassComment');
    }
}


exports.createClassComment = async function (classcomment) {
    // Creating a new Mongoose Object by using the new

    var newClassComment = new ClassComment({
        value: classcomment.value,
        label: classcomment.label,
        estado: classcomment.estado
    })

    try {
        // Saving the ClassComment 
        var savedClassComment = await newClassComment.save();
        var token = jwt.sign({
            id: savedClassComment._value
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating ClassComment")
    }
}

exports.updateClassComment = async function (classcomment) {
    
    var id = {key :classcomment.key}

    try {
        //Find the old ClassComment Object by the Id
        var oldClassComment = await ClassComment.findOne(id);
    } catch (e) {
        throw Error("Error occured while Finding the ClassComment")
    }
    // If no old ClassComment Object exists return false
    if (!oldClassComment) {
        return false;
    }
    //Edit the ClassComment Object
    oldClassComment.keyClass = classcomment.keyClass
    oldClassComment.comment = classcomment.comment
    oldClassComment.estado = classcomment.estado

    try {
        var savedClassComment = await oldClassComment.save()
        return savedClassComment;
    } catch (e) {
        throw Error("And Error occured while updating the ClassComment");
    }
}

exports.deleteClassComment = async function (id) {

    // Delete the ClassComment
    try {
        var deleted = await ClassComment.remove({
            _value: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("ClassComment Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the ClassComment")
    }
}


