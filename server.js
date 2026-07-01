const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/signup", (req, res) => {
  const { name, email, password, age } = req.body;

  const errors = {};

  if (!name || name.length < 3) {
    errors.name = "Name must be at least 3 characters.";
  }

  if (!email || !email.includes("@")) {
    errors.email = "Invalid email.";
  }

  if (!password || password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  if (!age || age < 18) {
    errors.age = "Age must be 18 or above.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  return res.json({ message: "Signup successful 🎉" });
});


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});