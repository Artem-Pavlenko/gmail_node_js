const express = require('express')
const app = express()
const port = 3010

const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    // port: 465,
    // secure: true, // use SSL
    auth: {
        user: 'artemdevakk@gmail.com',
        pass: '19942810',
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/sendMessage', async (req, res) => {
    try {
        let info = await transporter.sendMail({
            from: 'Portfolio', // sender address
            to: "artemdevakk@gmail.com", // list of receivers
            subject: "Hello ✔, testing gmail ", // Subject line
            //text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        })
    } catch (e) {
        console.log(e)
    }




    res.send('send message')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})