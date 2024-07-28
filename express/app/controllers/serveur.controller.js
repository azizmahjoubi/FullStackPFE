const db = require("../models");
const Serveur = db.serveurs;

// Create and Save a new Serveur
exports.create = (req, res) => {
    // Validate request
    if (!req.body.id) {
      res.status(400).send({ message: "ID can not be empty!" });
      return;
    }
  
    // Create a Serveur
    const serveur = new Serveur({
      id: req.body.id,
      app: req.body.app,
      bdd: req.body.bdd,
      adm: req.body.adm,
      statut: req.body.statut,
      ip: req.body.ip,
      dns: req.body.dns,
      hostname: req.body.hostname,
      phy_vm: req.body.phy_vm,
      prod_int_pca: req.body.prod_int_pca,
      cpu: req.body.cpu,
      ram: req.body.ram,
      disc: req.body.disc,
      carte_rsx: req.body.carte_rsx,
      os: req.body.os,
      version: req.body.version,
      port: req.body.port,
      path: req.body.path,

      services_a_demarrer: req.body.services_a_demarrer,
      flux_entrant: req.body.flux_entrant,
      flux_sortant: req.body.flux_sortant,
      acces: req.body.acces
    });
  
    // Save Serveur in the database
    serveur
      .save(serveur)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Server."
        });
      });
  };
  

// Retrieve all Servers from the database.
exports.findAll = (req, res) => {
    const id = req.query.id;
    var condition = id ? { id: { $regex: new RegExp(id), $options: "i" } } : {};
  
    Serveur.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving servers."
        });
      });
  };
  

// Find a single Server with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Serveur.findOne({ id: id })
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Server with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Server with id=" + id });
      });
  };
  
// Update a Server by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Serveur.findOneAndUpdate({ id: id }, req.body, { useFindAndModify: false })
    .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Server with id=${id}. Maybe Serveur was not found!`
          });
        } else res.send({ message: "Server was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Server with id=" + id
        });
      });
  };
  

// Delete a Server with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Serveur.findOneAndDelete({ id: id })
          .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Server with id=${id}. Maybe Server was not found!`
          });
        } else {
          res.send({
            message: "Server was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Server with id=" + id
        });
      });
  };
  

// Delete all Servers from the database.
exports.deleteAll = (req, res) => {
    Serveur.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Servers were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all servers."
        });
      });
  };
  

// Find all Active Servers
exports.findAllActive = (req, res) => {
    Serveur.find({ statut: "Active" })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving servers."
        });
      });
  };
  