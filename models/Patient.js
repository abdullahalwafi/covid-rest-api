// import database
const db = require("../config/database");
// membuat class Patient
class Patient {
  // buat fungsi
  /**
   * Membuat method static all.
   */
  static all() {
    // return Promise sebagai solusi Asynchronous
    return new Promise((resolve, reject) => {
      const query = "SELECT * from patients";
      /**
       * Melakukan query menggunakan method query.
       * Menerima 2 params: query dan callback
       */
      db.query(query, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  /**
   * TODO 1: Buat fungsi untuk insert data.
   * Method menerima parameter data yang akan diinsert.
   * Method mengembalikan data patient yang baru diinsert.
   */
  static create(patient) {
    return new Promise((resolve, reject) => {
      const { name, phone, address, status, in_date_at, out_date_at } = patient;
      const query = "INSERT INTO patients SET ?";
      const values = {
        name,
        phone,
        address,
        status,
        in_date_at,
        out_date_at,
      };

      db.query(query, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          // Menambahkan id yang baru saja diinsert ke dalam objek values
          values.id = results.insertId;
          resolve(values);
        }
      });
    });
  }

  static update(id, patient) {
    return new Promise((resolve, reject) => {
      const oldPatientQuery = `SELECT * FROM patients WHERE id = ${id}`;

      // Mengambil data patient lama yang akan di-edit untuk men-set data lama yang tidak di-edit
      db.query(oldPatientQuery, (err, oldPatientResults) => {
        if (err) {
          reject(err);
          return;
        }

        const oldPatient = oldPatientResults[0];

        // Mendapatkan nilai baru atau menggunakan nilai lama jika tidak ada perubahan
        const name = patient.name ?? oldPatient.name;
        const phone = patient.phone ?? oldPatient.phone;
        const address = patient.address ?? oldPatient.address;
        const status = patient.status ?? oldPatient.status;
        const inDateAt = patient.in_date_at ?? oldPatient.in_date_at;

        // Memeriksa apakah outDateAt adalah tanggal yang valid atau NULL
        let outDateAt;
        if (patient.out_date_at) {
          const parsedOutDate = new Date(patient.out_date_at);
          outDateAt = !isNaN(parsedOutDate)
            ? `'${parsedOutDate.toISOString().slice(0, 19).replace("T", " ")}'`
            : "NULL";
        } else {
          outDateAt = oldPatient.out_date_at
            ? `'${oldPatient.out_date_at}'`
            : "NULL";
        }

        const query = `UPDATE patients SET 
                  name = '${name}', 
                  phone = '${phone}', 
                  address = '${address}', 
                  status = '${status}', 
                  in_date_at = '${inDateAt}', 
                  out_date_at = ${outDateAt}, 
                  timestamp = CURRENT_TIMESTAMP
                  WHERE id = ${id}`;

        db.query(query, (err, results) => {
          if (err) {
            reject(err);
          } else {
            // Menggabungkan data lama dan data baru untuk dikirimkan sebagai respons
            const updatedPatient = { ...oldPatient, ...patient };
            resolve(updatedPatient);
          }
        });
      });
    });
  }

  static destroy(id) {
    return new Promise((resolve, reject) => {
      // Mengambil data yang akan dihapus
      const selectQuery = `SELECT * FROM patients WHERE id = '${id}'`;

      db.query(selectQuery, (selectErr, selectResults) => {
        if (selectErr) {
          reject(selectErr);
          return;
        }

        const deletedPatient = selectResults[0];

        // Menghapus data
        const deleteQuery = `DELETE FROM patients WHERE id = '${id}'`;

        db.query(deleteQuery, (deleteErr, deleteResults) => {
          if (deleteErr) {
            reject(deleteErr);
            return;
          }

          // Mengembalikan data yang dihapus
          resolve(deletedPatient);
        });
      });
    });
  }

  static show(id) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM patients WHERE id = ${id}`;
      db.query(query, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  // mencari sesuai nama
  static search(name) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM patients WHERE name LIKE "%${name}%"`;
      db.query(query, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  // mencari sesuai status
  static findByStatus(status) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM patients WHERE status = "${status}"`;
      db.query(query, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}

// export class Patient
module.exports = Patient;
