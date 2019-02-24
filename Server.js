const express = require("express"),
    nodemailer = require("nodemailer"),
    app = express(),
    path = require("path")

const PORT = process.env.PORT,
    buildDir = path.join(__dirname, "build"),
    assetsDir = path.join(__dirname, "assets")

const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "cjsportfolio8@gmail.com",
        pass: "mgxnommmlmtcyccz"
    }
})

app.get("/", (req, res) => {
    res.sendFile("/Users/camdenshaw/Documents/freeCodeCamp/Portfolio/")
})

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', `http://localhost:${PORT}`);

    res.setHeader('Access-Control-Allow-Methods', 'GET');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.use("/build", express.static(buildDir))
app.use("/assets", express.static(assetsDir))

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})

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
            console.log(`Message sent: ${response.jsonStringify()}.`)
            res.end("sent")
        }
    })
})

app.listen(PORT, () => {
    console.log(`Express has started on Port ${PORT}`)
})