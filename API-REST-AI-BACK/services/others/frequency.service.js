// Gettign the Newly created Mongoose Model we just created 
var Frequency = require('../../models/others/Frequency.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the Frequency  List
exports.getFrequency = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        var frequency = await Frequency.paginate(query, options)
        // Return the students list that was retured by the mongoose promise
        return frequency;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Frequency');
    }
}

exports.createFrequency = async function (frequency) {
    // Creating a new Mongoose Object by using the new

    var newFrequency = new Frequency({
        value: frequency.value,
        label: frequency.label,
    })

    try {
        // Saving the Frequency 
        var savedFrequency = await newFrequency.save();
        var token = jwt.sign({
            id: savedFrequency._value
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating Frequency")
    }
}

exports.updateFrequency = async function (frequency) {
    
    var id = {value :frequency.value}

    try {
        //Find the old Frequency Object by the Id
        var oldFrequency = await Frequency.findOne(id);
    } catch (e) {
        throw Error("Error occured while Finding the Frequency")
    }
    // If no old Frequency Object exists return false
    if (!oldFrequency) {
        return false;
    }
    //Edit the Frequency Object
    oldFrequency.value = frequency.value
    oldFrequency.label = frequency.label
    try {
        var savedFrequency = await oldFrequency.save()
        return savedFrequency;
    } catch (e) {
        throw Error("And Error occured while updating the Frequency");
    }
}

exports.deleteFrequency = async function (id) {

    // Delete the Frequency
    try {
        var deleted = await Frequency.remove({
            _value: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Frequency Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Frequency")
    }
}


