var nodemailer = require('nodemailer');

const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "ricardomanuelpeleira@gmail.com",
      pass: "qcwrdlcthjenrtln"
    }
  });

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    });
});

app.get('/sendEmail', (req, res) => {
    const email_from = req.query.email_from;
    const message = req.query.message;

    const mailOptions = {
        from: 'Ricardo P <ricardopeleira16@gmail.com>',
        to: 'ricardopeleira16@gmail.com',
        subject: 'Travel Treasury Contact Form Submission',
        html: `${message} <br><br> From ${email_from}`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
        console.log(`ERROR: (email) ${email_from} --- (message) ${message} --- (error) ${error.toString()}`);
        res.send(error.toString());
        }
        res.send('You message was submitted successfully!');
    });
});

app.listen(2020, () => {
    console.log('server is listening on port 9000');
});