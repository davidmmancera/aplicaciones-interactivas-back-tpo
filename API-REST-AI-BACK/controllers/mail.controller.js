let nodemailer = require('nodemailer');

exports.sendEmail = async function (req, res, next){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {user: 'userInstitular@gmail.com', pass: 'vbhhonlkashvaexw'}
    });
    const mailOptions = {
        from: 'userinstitular@gmail.com',
        to: req.body.email,
        subject: "Recuperacion de contraseña",
        html: '<div>' +
            '<p>Hola:</p>\n' +
            '<p>Visita este vínculo para restablecer la contraseña de Institular para tu cuenta de ' + req.body.email + '</p>\n' +
            '<p><a href="http://localhost:3000/recoverPassword"></a>Recuperá tu contraseña aquí</p>\n' +
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

exports.sendEmailHiring = async function (req, res, next){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {user: 'userInstitular@gmail.com', pass: 'vbhhonlkashvaexw'}
    });
    const mailOptions = {
        from: 'userinstitular@gmail.com',
        to: req.body.email,
        subject: "Respuesta sobre contratación de curso",
        html: '<div>' +
            '<p>Hola:</p>\n' +
            '<p>Su petición sobre el curso:  ' + req.body.nombre + ' </p>\n' +
            '<p>Es:  ' + req.body.estado + '</p>\n' +            
            '<p>Si no solicitaste ningún curso, puedes ignorar este correo electrónico.</p>\n' +
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