const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Employeeschema = new schema({
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
    categorie: {
        type: String,
        required: [true, 'Ce champs est obligatoire']
    },
    specialite: {
        type: String,
        required: [true, 'Ce champs est obligatoire']
    },
    numCnss: {
        type: Number,
        required: [true, 'Ce champs est obligatoire']
    },
    age: {
        type: Number,
        required: [true, 'Ce champs est obligatoire']
    },
    disponibilite: {
        type: Boolean,
        required: [true, 'Ce champs est obligatoire']
    },
}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('Employee', Employeeschema)