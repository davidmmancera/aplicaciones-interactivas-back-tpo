var TeacherService = require('../../services/teacher.service');
var TeacherImgService =require('../../services/teacherImg.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getTeachers = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Teachers = await TeacherService.getTeachers({}, page, limit)
        // Return the Teachers list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Teachers, message: "Succesfully Teacher Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}
exports.getTeachersByMail = async function (req, res) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    let filtro= {email: req.body.email}
    try {
        var Teachers = await TeacherService.getTeachers(filtro, page, limit)
        // Return the Teachers list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Teachers, message: "Succesfully Teachers Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createTeacher = async function (req, res) {
    // Req.Body contains the form submit values.
    console.log("Llegue al controller",req.body)
    var Teacher = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdTeacher = await TeacherService.createTeacher(Teacher)
        return res.status(201).json({createdTeacher, message: "Succesfully Created Teacher"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "UTeacherser Creation was Unsuccesfull"})
    }
}

exports.updateTeacher = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.name) {
        return res.status(400).json({status: 400., message: "Name be present"})
    }

    
    var Teacher = {
       
        name: req.body.name ? req.body.name : null,
        email: req.body.email ? req.body.email : null,
        password: req.body.password ? req.body.password : null
    }
    try {
        var updatedTeacher = await TeacherService.updateTeacher(Teacher)
        return res.status(200).json({status: 200, data: updatedTeacher, message: "Succesfully Updated Teacher"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeTeacher = async function (req, res, next) {

    var id = req.params.id;
    try {
        var deleted = await TeacherService.deleteTeacher(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}


exports.loginTeacher = async function (req, res) {
    // Req.Body contains the form submit values.
    console.log("body",req.body)
    var Teacher = {
        email: req.body.email,
        password: req.body.password
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var loginTeacher = await TeacherService.loginTeacher(Teacher);
        if (loginTeacher===0)
            return res.status(400).json({message: "Error en la contraseña"})
        else
            return res.status(201).json({loginTeacher, message: "Succesfully login"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: "Invalid username or password"})
    }
}

exports.guardarImagenTeacher = async function (req, res) {

    console.log("ImgTeacher",req.body)
    // Id is necessary for the update
    if (!req.body.email) {
        return res.status(400).json({status: 400., message: "Mail must be present"})
    }

    let teacherImg = {
        email: req.body.email,
        nombreImagen : req.body.nombreImagen
    }
    
    try {
        if (teacherImg.nombreImagen!=='')
        {
            var newTeachermg = await TeacherImgService.createTeacherImg(teacherImg);
        }
        
        return res.status(201).json({status: 201, message: "Imagen cargada"});
        
    } catch (e) {
        console.log("error guardar imagen",e)
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.getImagenTeacherByMail = async function (req, res) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    //obtener filtro
    var filtro = {
        mail: req.body.email
    }
    try {
        var TeacherImg = await TeacherImgService.getImagenesByTeacher(filtro, page, limit)
        // Return the Teachers list with the appropriate HTTP password Code and Message.
        console.log("teacherByDni",TeacherImg)
        if (TeacherImg.total===0)
            return res.status(201).json({status: 201, data: TeacherImg, message: "No existe Mail"});
        else
            return res.status(200).json({status: 200, data: TeacherImg, message: "Succesfully Teacher Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: e.message});
    }
}
    
    
