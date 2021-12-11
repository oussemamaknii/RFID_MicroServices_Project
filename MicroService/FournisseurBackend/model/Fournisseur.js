const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var fournisseur = new Schema({
  id: String,
  name: String,
  email: String,
  localisation: String,
  imageUrl: String,
});
module.exports = mongoose.model("fournisseurs", fournisseur);
