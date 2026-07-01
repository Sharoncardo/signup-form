const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/signup", (req, res) => {
  const data = req.body;

  if (!data.name) {
    return res.status(400).json({
      errors: {
        name: "Name field is required. Please enter your name."
      }
    });
  }

  res.json({ message: "Signup successful 🎉" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});