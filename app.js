const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");
const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const authRoute = require('./app/routes/auth.routes')(app);
const userRoute = require('./app/routes/user.routes')(app);
const customerRoute = require('./app/routes/customer.routes')(app);

const PORT = process.env.PORT || 8080;
db.sequelize.sync({ force: false })
    .then(result => {
        app.listen(PORT, () => {
            console.log(PORT, `Listening on port ${PORT}`);
        });
    })
    .catch(e => {
        console.log(e);
    })
