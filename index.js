const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer'); // Optional for sending emails
const app = express();

// Middleware to serve static files (your HTML)
app.use(express.static('public'));

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Route to handle form submission
app.post('/submit', (req, res) => {
    const { name, email, message, address, city, state, zip, sample_types, other_specify, company, country } = req.body;
    
        
    sendEmail(name, email, message, address, city, state, zip, sample_types, other_specify, company, country);

    // Optional: Send email
    // sendEmail(name, email, message);

    // Response after form submission
    res.redirect('/?thanks');
});

function createEmailBody(name, email, message, address, city, state, zip, sample_types, other_specify, company, country) {
    return `
        <table>
            <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
            <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
            <tr><td><strong>Company:</strong></td><td>${company}</td></tr>
            <tr><td><strong>Message:</strong></td><td>${message}</td></tr>
            <tr><td><strong>Address:</strong></td><td>${address}</td></tr>
            <tr><td><strong>City:</strong></td><td>${city}</td></tr>
            <tr><td><strong>State/Province:</strong></td><td>${state}</td></tr>
            <tr><td><strong>Postal Code:</strong></td><td>${zip}</td></tr>
            <tr><td><strong>Country:</strong></td><td>${country}</td></tr>
            <tr><td><strong>Sample Types:</strong></td><td>${sample_types}</td></tr>
            <tr><td><strong>Other Specify:</strong></td><td>${other_specify}</td></tr>
        </table>
    `;
}

// Update sendEmail function to use createEmailBody
function sendEmail(name, email, message, address, city, state, zip, sample_types, other_specify, company, country) {
    const formattedMessage = createEmailBody(name, email, message, address, city, state, zip, sample_types, other_specify, company, country);
    
    const transporter = nodemailer.createTransport({
        host: "smtp.mailgun.org",
        port: 587,
        secure: false,
        auth: {
          user: "postmaster@mg.stayonline.com",
          pass: "|sTVv#)7W%W.",
        },
      });
      
      

    const mailOptions = {
        from: 'no-reply@stayonline.com',
        to: 'jim.smits@stayonline.com',
        subject: `New contact form submission from ${name}`,
        html: formattedMessage,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent: ' + info.response);
    });
}


const PORT = process.env.PORT || 8080; 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
