//Express
const express = require('express');
const cookieParser = require('cookie-parser');
const bluebird = require('bluebird');

//incorporo cors
const cors = require('cors');

//importo router
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/user.route'); //Custom

const apiClassTypeRouter = require('./routes/classType.route');
const apiCommentsRouter = require('./routes/comments.route');
const apiFrequencyRouter = require('./routes/frequency.route');
const apiCourseRouter = require('./routes/course.route');
const apiHiringRouter = require('./routes/hiring.route');
const apiQualificationRouter = require('./routes/qualification.route');
const apiStudentRouter = require('./routes/student.route');
const apiStudentClassesRouter = require('./routes/studentClasses.route');
const apiStudentClassCommentRouter = require('./routes/studentClassComment.route');
const apiStudiesRouter = require('./routes/studies.route');
const apiTeacherRouter = require('./routes/teacher.route');
const apiTeacherClassesRouter = require('./routes/teacherClasses.route');
const apiTeacherClassCommentRouter = require('./routes/teacherClassComment.route');

const utilRouter = require('./routes/utils');

//instancio el servidor
const app = express();

//engine que permite renderizar paginas web
app.set('view engine', 'jade');
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

//aplico cors
app.use(cors());
app.use(cookieParser());

//Indico las rutas de los endpoint
app.use('/users', apiRouter);
app.use('/', indexRouter);
app.use('/utils/',utilRouter);

app.use('/classType', apiClassTypeRouter);
app.use('/comments', apiCommentsRouter);
app.use('/frequency', apiFrequencyRouter);
app.use('/course', apiCourseRouter);
app.use('/hiring', apiHiringRouter);
app.use('/qualification', apiQualificationRouter);
app.use('/student', apiStudentRouter);
app.use('/studentClasses', apiStudentClassesRouter);
app.use('/studentClassComment', apiStudentClassCommentRouter);
app.use('/teacherClassComment', apiTeacherClassCommentRouter);
app.use('/studies', apiStudiesRouter);
app.use('/teacher', apiTeacherRouter);
app.use('/teacherClasses', apiTeacherClassesRouter);

//onsole.log("processENV", process.env);
if (process.env.NODE_ENV === 'Development') {
  require('./config').config();
}


//Database connection --
var mongoose = require('mongoose')
mongoose.Promise = bluebird;
let url = `${process.env.DATABASE1}${process.env.DATABASE2}=${process.env.DATABASE3}=${process.env.DATABASE4}`
console.log("BD",url);
let opts = {
  useNewUrlParser : true, 
  connectTimeoutMS:20000, 
  useUnifiedTopology: true
  };

mongoose.connect(url,opts)
  .then(() => {
    console.log(`Succesfully Connected to theMongodb Database..`)
  })
  .catch((e) => {
    console.log(`Error Connecting to the Mongodb Database...`)
    console.log(e)
  })


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  
});


// Setup server port
var port = process.env.PORT || 8080;
// Escuchar en el puerto
app.listen(port,()=>{
    console.log('Servidor de ABM Users iniciado en el puerto ',port);
});


module.exports = app;