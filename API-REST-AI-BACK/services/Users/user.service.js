// Gettign the Newly created Mongoose Model we just created 
var User = require('../../models/Users/User.model');
var Teacher = require('../../models/Teachers/Teacher.model');
var Student = require('../../models/Students/Student.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getAllUser = async function (query) {
    // Try Catch the awaited promise to handle the error
    try {
        return await User.find();
    } catch (e) {
        // return a Error message describing the reason
        console.log("error services",e)
        throw Error('Error while Paginating Users');
    }
}

// Async function to get the User List
exports.getUser = async function (query) {
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        const id = jwt.decode(query.token, {complete: true});
        return await User.findOne({_id: id.payload.id});
    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Users');
    }
}

exports.getUserByEmail = async function (query, page, limit) {
    const options = {page, limit};

    // Try Catch the awaited promise to handle the error
    try {
        console.log("Query",query)
        // Return the Userd list that was retured by the mongoose promise
        return await User.paginate(query, options);
    } catch (e) {
        // return a Error message describing the reason
        console.log("error services",e)
        throw Error('Error while Paginating Users');
    }
}

exports.createUser = async function (user) {
    // Creating a new Mongoose Object by using the new keyword
    var hashedPassword = bcrypt.hashSync(user.password, 8);
    
    var newUser = new User({
        name: user.name,
        email: user.email,
        date: new Date(),
        password: hashedPassword
    })

    try {
        // Saving the User 
        var savedUser = await newUser.save();
        var token = jwt.sign({
            id: savedUser._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating User")
    }
}

exports.updateUser = async function (user) {
    
    var id = {name :user.name}

    try {
        //Find the old User Object by the Id
        var oldUser = await User.findOne(id);
    } catch (e) {
        throw Error("Error occured while Finding the User")
    }
    // If no old User Object exists return false
    if (!oldUser) {
        return false;
    }
    //Edit the User Object
    var hashedPassword = bcrypt.hashSync(user.password, 8);
    oldUser.name = user.name
    oldUser.email = user.email
    oldUser.password = hashedPassword
    try {
        var savedUser = await oldUser.save()
        return savedUser;
    } catch (e) {
        throw Error("And Error occured while updating the User");
    }
}

exports.recoverPassword = async function (recover) {
    const id = jwt.decode(recover.token, {complete: true});
    const hashedPassword = bcrypt.hashSync(recover.password, 8);

    try {
        return await User.updateOne({ _id: id.payload.id }, { password: hashedPassword });
    } catch (e) {
        throw Error("No pudimos recuperar la clave.");
    }
}

exports.deleteUser = async function (id) {

    // Delete the User
    try {
        var deleted = await User.remove({key: id})
        await Teacher.remove({key: id})
        await Student.remove({key: id})
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("User Could not be deleted")
        }
        return deleted;
    } catch (e) {
        console.log(e)
        throw Error("Error Occured while Deleting the User")
    }
}


exports.loginUser = async function (user) {

    // Creating a new Mongoose Object by using the new keyword
    try {
        const _details = await User.findOne({email: user.email});
        const passwordIsValid = bcrypt.compareSync(user.password, _details.password);

        if (!passwordIsValid) return 0;

        const token = jwt.sign({
            id: _details._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return {token:token, user:_details};
    } catch (e) {
        // return a Error message describing the reason     
        throw Error("Error while Login User")
    }

}