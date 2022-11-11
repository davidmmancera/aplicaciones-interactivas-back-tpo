// Gettign the Newly created Mongoose Model we just created 
var ClassType = require('../../models/others/ClassType.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the ClassType  List
exports.getClassType = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        var ClassesTypes = await ClassType.paginate(query, options)
        // Return the students list that was retured by the mongoose promise
        return ClassesTypes;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating ClassType');
    }
}

exports.createClassType = async function (classType) {
    // Creating a new Mongoose Object by using the new

    var newClassType = new Student({
        value: classType.value,
        label: classType.label,
    })

    try {
        // Saving the ClassType 
        var savedClassType = await newClassType.save();
        var token = jwt.sign({
            id: savedClassType._value
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating ClassType")
    }
}

exports.updateClassType = async function (classType) {
    
    var id = {value :classType.value}

    try {
        //Find the old classtype Object by the Id
        var oldClassType = await ClassType.findOne(id);
    } catch (e) {
        throw Error("Error occured while Finding the classType")
    }
    // If no old classType Object exists return false
    if (!oldClassType) {
        return false;
    }
    //Edit the calsstype Object
    oldClassType.value = classType.value
    oldClassType.label = classType.label
    try {
        var savedClassType = await oldClassType.save()
        return savedClassType;
    } catch (e) {
        throw Error("And Error occured while updating the classType");
    }
}

exports.deleteClassType = async function (id) {

    // Delete the ClassType
    try {
        var deleted = await ClassType.remove({
            _value: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("ClassType Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the ClassType")
    }
}


