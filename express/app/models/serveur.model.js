module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        id: String,
        app: String,
        bdd: String,
        adm: String,
        statut: String,
        
          ip: String,
          dns: String,
          hostname: String,
          nature: String,
          phy_vm: String,
          prod_int_pca: String,
        
        cpu: Number,
        ram: Number,
        disc: Number,
        carte_rsx: String,
        os: String,
        
          version: String,
          port: Number,
          path: String
        ,
        services_a_demarrer: [String],
        flux_entrant: String,
        flux_sortant: String,
        acces: String
      },
      { timestamps: true }
    );
  
  
    const Serveur = mongoose.model("serveur", schema);
    return Serveur;
  };