const express = require("express")
const nodemailer = require("nodemailer")
const app = express()

const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "camden.shaw@gmail.com",
        pass: "zhcxtwlhtsueeafq"
    }
})

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'camdenshaw.ca');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get("/send", (req, res) => {
    let mailOptions = {
        from: req.query.from,
        to: req.query.to,
        subject: req.query.subject,
        text: req.query.text
    }
    console.log(mailOptions)
    smtpTransport.sendMail(mailOptions, (err, response) => {
        if(err) {
            console.log(err)
            res.end("error")
        } else {
            console.log(`Message sent: ${response.toString()}.`)
            res.end("sent")
        }
    })
})

app.listen(3010, () => {
    console.log("Express has started on Port 3010")
})