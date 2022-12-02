let nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");
const User = require("../models/Users/User.model");

exports.sendEmail = async function (req, res, next){
    const _details = await User.findOne({email: req.body.destinatario});
    const token = jwt.sign({
        id: _details._id
    }, process.env.SECRET, {
        expiresIn: 86400 // expires in 24 hours
    });
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {user: 'userInstitular@gmail.com', pass: 'vbhhonlkashvaexw'}
    });
    const link = "http://localhost:3000/recoverPassword?token=" + token
    const mailOptions = {
        from: 'userinstitular@gmail.com',
        to: req.body.destinatario,
        subject: "Recuperacion de contraseña",
        html: '<div>' +
            '<p>Hola:</p>\n' +
            '<p>Visita este vínculo para restablecer la contraseña de Institular para tu cuenta de ' + req.body.email + '</p>\n' +
            '<p><a href="' + link + '">Recuperá tu contraseña aquí</a></p>\n' +
            '<p>Si no solicitaste el restablecimiento de tu contraseña, puedes ignorar este correo electrónico.</p>\n' +
            '<p>Gracias.</p>\n' +
            '<p>El equipo de Institular</p>' +
            '</div>'
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
        return res.status(200).json({status: 200, message: "Mail sent successfully"});
    } catch(error) {
        console.log("Error envio mail: ",error);
        return res.status(400).json({status: 400, message: "Mail not sent"});
    }
};
