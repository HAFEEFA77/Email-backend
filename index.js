const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3104;


app.use(cors()); // enable CORS
app.use(bodyParser.urlencoded({ extended: false }));

app.post('http://localhost:3001/users', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Check if email and password are valid
    if (1) {
        // Retrieve data from JSON server
        axios.get('http://localhost:3001/users')
            .then((response) => {
                const users = response.data;
                const user = users.find((user) => user.email === email && user.password === password);

                if (user) {
                    // Send email
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'hafeefapc2003@gmail.com',
                            pass: 'suharak1357'
                        },
                        debug: true,
                        logger: true
                    });

                    const mailOptions = {
                        from: 'hafeefapc2003@gmail.com',
                        to: email,
                        subject: 'Login successful!',
                        text: 'Congratulations, you have successfully logged in!'
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });

                    res.send('Login successful! Email sent to ' + email);
                } else {
                    res.send('Invalid email or password');
                }
            })
            .catch((error) => {
                console.log(error);
                res.send('An error occurred while retrieving user data');
            });
    } else {
        res.send('Invalid email or password');
    }
});

app.listen(3104, () => {
    console.log(`App listening at http://localhost:${port}`);
});
