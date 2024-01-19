// import database
const db = require("../config/database");
// import bcrypt
const bcrypt = require("bcrypt");
// jwt
const jwt = require("jsonwebtoken");

// membuat class User
class User {
  /**
   * TODO 1: Buat fungsi untuk insert data.
   * Method menerima parameter data yang akan diinsert.
   * Method mengembalikan data user yang baru diinsert.
   */
  static create(user) {
    return new Promise((resolve, reject) => {
      const { name, email, password } = user;

      // Generate a salt and hash the password
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          reject(err);
        } else {
          const query = "INSERT INTO users SET ?";
          const values = {
            name,
            email,
            password: hashedPassword, // Store the hashed password in the database
          };

          db.query(query, values, (dbErr, results) => {
            if (dbErr) {
              reject(dbErr);
            } else {
              // Add the newly inserted id to the values object
              values.id = results.insertId;
              resolve(values);
            }
          });
        }
      });
    });
  }
  static Login(email, password) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE email = ?";
      db.query(query, [email], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length === 0) {
            reject(email + " tidak ditemukan");
          } else {
            const hashedPassword = results[0].password;
            bcrypt.compare(password, hashedPassword, (err, result) => {
              if (err) {
                reject(err);
              } else {
                if (result) {
                  // User authentication successful, generate JWT
                  const user = {
                    id: results[0].id,
                    name: results[0].name,
                    email: results[0].email,
                  };

                  const token = jwt.sign(user, "your-secret-key", {
                    expiresIn: "1h",
                  });

                  resolve({ user, token });
                } else {
                  reject("Password salah");
                }
              }
            });
          }
        }
      });
    });
  }
}

// export class User
module.exports = User;
