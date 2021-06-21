const express = require('express');
/* const multer = require("multer"); */
const cors = require("cors");

const app = express();
app.use(cors());

/* const upload = multer({
    dest: './upload',
}); */

//mailer bauen

const PORT = '5000' || process.env.PORT;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

//Antwort vom Server
app.post('/upload', (req, res) => {
    var data = {
        fileBetr: req.body.fileBetr,
        filePriv: req.body.filePriv,
    }

    /* var image = new Image();
    image.src = data.fileBetr;
    var procBetr = image; */


    //mail senden
    /*var message = {
        from: "sender@server.com",
        to: "receiver@sender.com",
        subject: "Message title",
        text: "Plaintext version of the message",
        html: "<p>HTML version of the message</p>"
    };

    attachments: [{ // encoded string as an attachment
        filename: 'Betreuungsvertrag1.jpg',
        content: data.fileBetr,
        encoding: 'base64'
    }, ]*/

    console.log(data.fileBetr);
    res.json({ "data": "success" });
});

// Default response for any other request
app.use(function(req, res) {
    res.status(404)
});