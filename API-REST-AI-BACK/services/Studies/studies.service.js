// Gettign the Newly created Mongoose Model we just created 
var Studies = require('../../models/Studies/studies.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the Studies  List
exports.getStudies = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        var studies = await Studies.paginate(query, options)
        // Return the students list that was retured by the mongoose promise
        return studies;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Studies');
    }
}

exports.createStudies = async function (studies) {
    // Creating a new Mongoose Object by using the new

    var newStudies = new Studies({
        value: studies.value,
        label: studies.label,
    })

    try {
        // Saving the Studies 
        var savedStudies = await newStudies.save();
        var token = jwt.sign({
            id: savedStudies._value
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating Studies")
    }
}

exports.updateStudies = async function (studies) {
    
    var id = {value :studies.value}

    try {
        //Find the old Studies Object by the Id
        var oldStudies = await Studies.findOne(id);
    } catch (e) {
        throw Error("Error occured while Finding the Studies")
    }
    // If no old Studies Object exists return false
    if (!oldStudies) {
        return false;
    }
    //Edit the Studies Object
    oldStudies.value = studies.value
    oldStudies.label = studies.label
    try {
        var savedStudies = await oldStudies.save()
        return savedStudies;
    } catch (e) {
        throw Error("And Error occured while updating the Studies");
    }
}

exports.deleteStudies = async function (id) {

    // Delete the Studies
    try {
        var deleted = await Studies.remove({
            _value: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Studies Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Studies")
    }
}


