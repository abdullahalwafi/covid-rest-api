// import Model Patient
const Patient = require("../models/Patient");

// buat class PatientController
class PatientController {
  // menambahkan keyword async
  async index(req, res) {
    // memanggil method static all dengan async await.

    await Patient.all()
      .then((result) => {
        const data = {
          message: "Menampilkkan semua patientss",
          data: [result],
        };

        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
  }

  async store(req, res) {
    try {
      const result = await Patient.create(req.body);
      const data = {
        message: "Menambahkan data patient baru",
        data: result,
      };

      res.json(data);
    } catch (error) {
      res.json(error);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      const result = await Patient.update(id, req.body);

      if (result) {
        const data = {
          message: `Mengedit patient id ${id}`,
          data: result,
        };

        res.json(data);
      } else {
        const data = {
          message: `Tidak dapat menemukan patient dengan id ${id}`,
        };

        res.status(404).json(data);
      }
    } catch (error) {
      res.status(500).json({
        message: "Gagal mengedit patient",
        error: error.message,
      });
    }
  }

  async destroy(req, res) {
    const { id } = req.params;

    await Patient.destroy(id).then((result) => {
      const data = {
        message: `Menghapus patient id ${id}`,
        data: [result],
      };

      res.json(data);
    });
  }
  // menambahkan method show
  async show(req, res) {
    const { id } = req.params;

    await Patient.show(id).then((result) => {
      const data = {
        message: `menampilkan patient id ${id}`,
        data: result,
      };

      res.json(data);
    });
  }
  // menambahkan method search
  async search(req, res) {
    const { name } = req.params;

    await Patient.search(name).then((result) => {
      const data = {
        message: `Mencari patient dengan nama ${name}`,
        data: [result],
      };

      res.json(data);
    });
  }

  async positive(req, res) {
    const status  = "positive";

    await Patient.findByStatus(status).then((result) => {
      const data = {
        message: `Menampilkan data patient status ${status}`,
        data: [result],
      };

      res.json(data);
    });
  }
  async recovered(req, res) {
    const status  = "recovered";

    await Patient.findByStatus(status).then((result) => {
      const data = {
        message: `Menampilkan data patient status ${status}`,
        data: [result],
      };

      res.json(data);
    });
  }

  async dead(res) {
    const status = "dead";

    await Patient.findByStatus(status).then((result) => {
      const data = {
        message: `Menampilkan data patient status ${status}`,
        data: [result],
      };

      res.json(data);
    });
  }
}

// membuat object PatientController
const object = new PatientController();

// export object PatientController
module.exports = object;
