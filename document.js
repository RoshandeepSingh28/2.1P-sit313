const express = require('express');
const bodyParser = require('body-parser');
const mailgun = require('mailgun-js');


const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the 'public' directory

// MailGun configuration
const DOMAIN = "mg.2.1p.com";
const apiKey = "2de70ef3d516105efe6860c53e1d5122-826eddfb-17627374";
const mg = mailgun({ apiKey: apiKey, domain: DOMAIN });

// Route to serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); 
});

// Route to handle form submission
app.post('/send-welcome-email', (req, res) => {
    const email = req.body.email;

    if (!email) {
        return res.status(400).send('Email is required');
    }

    const data = {
        from: 'Roshandeep Singh <roshandeepsingh75@gmail.com>',
        to: email,
        subject: 'Welcome to DEV@Deakin!',
        text: `Thank you for subscribing to DEV@Deakin! We're excited to have you on board.`
    };

    mg.messages().send(data, (error, body) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Error sending email');
        }
        console.log('Email sent:', body);
        res.send('Welcome email sent successfully!');
    });
});

app.listen(8080, function () {
  console.log("Server is listening on port 8080");
});
