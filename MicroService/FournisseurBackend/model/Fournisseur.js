const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var fournisseur = new Schema({
    FullName: String,
    Phone: Number
});
module.exports = mongoose.model('fournisseurs', fournisseur);