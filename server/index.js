var nodemailer = require('nodemailer');

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

let transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    secure: false,
    auth: {
      user: "apikey",
      pass: "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"
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

app.listen(9000, () => {
    console.log('server is listening on port 9000');
});