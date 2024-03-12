const db = require("../utils/connect");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

module.exports = {
  register: async (req, res) => {
    // Chech User if exits

    const q = "SELECT*FROM users WHERE username = ?";

    db.query(q, [req.body.username], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(409).json("User already exists");

      //create a new user
      //hash password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);

      const qu = "INSERT INTO users (username, email, password) VALUES (?)";

      const values = [req.body.username, req.body.email, hashedPassword];

      db.query(qu, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("User has been created");
      });
    });
  },

  login: async (req, res) => {
    const qu = "SELECT * FROM users WHERE email = ?";

    db.query(qu, [req.body.email], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("USER NOT FOUND");

      const checkPassword = bcrypt.compareSync(
        req.body.password,
        data[0].password
      );

      if (checkPassword) {
        return res.status(400).json("Wrong password");
      } else {
        res
          .status(200)
          .json({ status: true, message: "login user successfully" });
      }

      const token = jwt.sign(
        {
          id: data[0].id,
        },
        process.env.SECRETE_KEY
      );

      const { password, ...others } = data[0];
      res
        .cookie("access_token", token, {
          httponly: true,
        })
        .status(200)
        .json(others);
    });
  },
  logout: async (req, res) => {
    res.send("Welcome");
  },
};
