var CourseService = require('../../services/others/course.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getCourse = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var course = await CourseService.getCourse({}, page, limit)
        // Return the Frequencies list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: course, message: "Succesfully Course Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createCourse = async function (req, res) {
    // Req.Body contains the form submit values.
    console.log("Llegue al controller",req.body)
    var Course = {
        value: req.body.value,
        label: req.body.label,
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdCourse = await CourseService.createCourse(Course)
        return res.status(201).json({createdCourse, message: "Succesfully Created Course"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Course Creation was Unsuccesfull"})
    }
}

exports.updateCourse = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.label) {
        return res.status(400).json({status: 400., message: "Label be present"})
    }

    
    var course = {       
        value: req.body.value ? req.body.value : null,
        label: req.body.label ? req.body.label : null,
        description: req.body.description ? req.body.description : null
    }
    try {
        var updatedCourse = await CourseService.updateCourse(course)
        return res.status(200).json({status: 200, data: updatedCourse, message: "Succesfully Updated Course"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeCourse = async function (req, res, next) {

    var id = req.params.value;
    try {
        var deleted = await CourseService.deleteCourse(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}