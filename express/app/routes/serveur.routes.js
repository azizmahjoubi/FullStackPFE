module.exports = app => {
    const serveurs = require("../controllers/serveur.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Server
    router.post("/", serveurs.create);
  
    // Retrieve all Servers
    router.get("/", serveurs.findAll);
  
    // Retrieve all active Servers
    router.get("/active", serveurs.findAllActive);
  
    // Retrieve a single Server with id
    router.get("/:id", serveurs.findOne);
  
    // Update a Server with id
    router.put("/:id", serveurs.update);
  
    // Delete a Server with id
    router.delete("/:id", serveurs.delete);
  
    // Delete all Servers
    router.delete("/", serveurs.deleteAll);
  
    app.use('/api/serveurs', router);
  };
  