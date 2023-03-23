const connectToDb = require("./database/dbConnection")
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config()
connectToDb()

const app = express();

app.use(express.json())
app.use(bodyParser.json());
app.use(cors())


const port = process.env.PORT || 3000;
const host = process.env.HOST

app.use("/api/auth",require("./routes/auth"));
app.use("/api/chat",require("./routes/test"));

app.listen(port, () => {
    console.log(`Server is running on http://${host}:${port}`)
})
