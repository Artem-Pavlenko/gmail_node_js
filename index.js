const express = require('express')
const nodemailer = require("nodemailer");
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

let port = process.env.PORT || 3010
let smtpLogin = process.env.SMTP_LOGIN || 'artemdevakk@gmail.com'
let smtpPass = process.env.SMTP_PASS

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    // port: 465,
    // secure: true, // use SSL
    auth: {
        user: smtpLogin,
        pass: smtpPass
    }
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/sendMessage', async (req, res) => {
    let {name, email, text} = req.body
    try {
        let info = await transporter.sendMail({
            from: `Portfolio, ${name}`, // sender address
            to: "artemdevakk@gmail.com", // list of receivers
            subject: `Message from ${name} `, // Subject line
            // text: `Message from ${email}. ${text}`, // plain text body
            html: `<span>from:</span><b>${email}</b>
                    <b>Message from your portfolio</b>
                    <div>
                        contact name: ${name} , 
                    </div>
                    <div>
                        ${text}
                    </div>`
        })
    } catch (e) {
        console.log(e)
    }

    res.send(req.body)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})