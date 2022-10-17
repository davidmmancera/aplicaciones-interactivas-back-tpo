var StudentService = require('../services/student.service');
var StudentImgService =require('../services/studentImg.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getStudents = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Students = await StudentService.getStudents({}, page, limit)
        // Return the Students list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Students, message: "Succesfully Student Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}
exports.getStudentsByMail = async function (req, res) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    let filtro= {email: req.body.email}
    try {
        var Students = await StudentService.getStudents(filtro, page, limit)
        // Return the Students list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Students, message: "Succesfully Students Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createStudent = async function (req, res) {
    // Req.Body contains the form submit values.
    console.log("Llegue al controller",req.body)
    var Student = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdStudent = await StudentService.createStudent(Student)
        return res.status(201).json({createdStudent, message: "Succesfully Created Student"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Student Creation was Unsuccesfull"})
    }
}

exports.updateStudent = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.name) {
        return res.status(400).json({status: 400., message: "Name be present"})
    }

    
    var Student = {       
        name: req.body.name ? req.body.name : null,
        email: req.body.email ? req.body.email : null,
        password: req.body.password ? req.body.password : null
    }
    try {
        var updatedStudent = await StudentService.updateStudent(Student)
        return res.status(200).json({status: 200, data: updatedStudent, message: "Succesfully Updated Student"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeStudent = async function (req, res, next) {

    var id = req.params.id;
    try {
        var deleted = await StudentService.deleteStudent(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}


exports.loginStudent = async function (req, res) {
    // Req.Body contains the form submit values.
    console.log("body",req.body)
    var Student = {
        email: req.body.email,
        password: req.body.password
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var loginStudent = await StudentService.loginStudent(Student);
        if (loginStudent===0)
            return res.status(400).json({message: "Error en la contraseña"})
        else
            return res.status(201).json({loginStudent, message: "Succesfully login"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: "Invalid username or password"})
    }
}

exports.guardarImagenStudent = async function (req, res) {

    console.log("ImgStudent",req.body)
    // Id is necessary for the update
    if (!req.body.email) {
        return res.status(400).json({status: 400., message: "Mail must be present"})
    }

    let studentImg = {
        email: req.body.email,
        nombreImagen : req.body.nombreImagen
    }
    
    try {
        if (studentImg.nombreImagen!=='')
        {
            var newStudentImg = await StudentImgService.createStudentImg(studentImg);
        }
        
        return res.status(201).json({status: 201, message: "Imagen cargada"});
        
    } catch (e) {
        console.log("error guardar imagen",e)
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.getImagenStudentByMail = async function (req, res) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    //obtener filtro
    var filtro = {
        mail: req.body.email
    }
    try {
        var StudentImg = await StudentImgService.getImagenesByStudent(filtro, page, limit)
        // Return the Student list with the appropriate HTTP password Code and Message.
        console.log("studentByDni",StudentImg)
        if (StudentImg.total===0)
            return res.status(201).json({status: 201, data: StudentImg, message: "No existe Mail"});
        else
            return res.status(200).json({status: 200, data: StudentImg, message: "Succesfully Student Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: e.message});
    }
}
    
    
