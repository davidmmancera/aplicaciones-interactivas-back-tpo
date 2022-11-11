// Gettign the Newly created Mongoose Model we just created 
var Qualification = require('../../models/others/Qualifications.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the Qualification  List
exports.getQualification = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        var qualification = await Qualification.paginate(query, options)
        // Return the students list that was retured by the mongoose promise
        return qualification;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Qualification');
    }
}

exports.createQualification = async function (qualification) {
    // Creating a new Mongoose Object by using the new

    var newQualification = new Qualification({
        value: qualification.value,
        label: qualification.label,
    })

    try {
        // Saving the Qualification 
        var savedQualification = await newQualification.save();
        var token = jwt.sign({
            id: savedQualification._value
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating Qualification")
    }
}

exports.updateQualification = async function (qualification) {
    
    var id = {value :qualification.value}

    try {
        //Find the old Qualification Object by the Id
        var oldQualification = await Qualification.findOne(id);
    } catch (e) {
        throw Error("Error occured while Finding the Qualification")
    }
    // If no old Qualification Object exists return false
    if (!oldQualification) {
        return false;
    }
    //Edit the Qualification Object
    oldQualification.value = qualification.value
    oldQualification.label = qualification.label
    try {
        var savedQualification = await oldQualification.save()
        return savedQualification;
    } catch (e) {
        throw Error("And Error occured while updating the Qualification");
    }
}

exports.deleteQualification = async function (id) {

    // Delete the Qualification
    try {
        var deleted = await Qualification.remove({
            _value: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Qualification Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Qualification")
    }
}


