const express = require('express')
const app = express()
const port = 8000
const path = require('path');
const cors = require('cors');
const fileupload = require("express-fileupload");

const corsOptions = {
  origin: 'https://image-gellery.rahulpal5.repl.co', // Replace with your frontend's URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow credentials like cookies
  optionsSuccessStatus: 204, // Return a 204 status code for preflight requests
};

// Enable CORS with the configured options
app.use(cors());
app.use(cors(corsOptions));

//adding middlewares
app.use(express.json());
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));


// Render Html File
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'templates/index.html'));
});

//backend connects
const dbconnect = require("./config/database");
dbconnect();

const cloudinaryconnect = require("./config/cloudinary")
cloudinaryconnect();

const router = require("./routes/upload");
app.use("/api/v1", router);


app.listen(port, () => {
  // Code.....
  console.log(`app is running in successfully  3000`);
})