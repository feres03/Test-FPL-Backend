const mongoose = require('mongoose');
const schema = mongoose.Schema;
const AdminSchema = new schema({
    nom: {
        type: String,
        required: [true, 'Ce champs est obligatoire']
    },
    prenom: {
        type: String,
        required: [true, 'Ce champs est obligatoire']
    },
    email: {
        type: String,
        required: [true, 'Ce champs est obligatoire'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Ce champs est obligatoire']
    },
    categorie: {
        type: String,
        required: [true, 'Ce champs est obligatoire']
    },
    departement: {
        type: String,
        required: [true, 'Ce champs est obligatoire']
    },

}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('Admin', AdminSchema)