// import database
const db = require("../config/database");
// import bcrypt
const bcrypt = require("bcrypt");
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
}

// export class User
module.exports = User;
