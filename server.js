const express = require("express"); // import the Express library
const multer = require("multer"); // import the Multer library for handling file uploads
const fs = require("fs"); // file system module to read folders
const app = express();  // create an Express application

const port = 3000; //local server port
const upload = multer({ dest: "wish-uploads/" }); //tells Multer to save uploaded audio files to the "wish-uploads" folder

//middleware serve static files from the "public" directory
app.use(express.static("public"));
app.use("/wishes-audio", express.static("wish-uploads"));

// Route to handle wish uploads
app.post("/upload", upload.single("audio"), (req, res) => {
  console.log("Wish received:", req.file);
  res.json({ success: true });
});

// Route to get all wishes
app.get("/wishes", (req, res) => {
  const files = fs.readdirSync("wish-uploads");
  res.json(files);
});

// Start the server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
}); 