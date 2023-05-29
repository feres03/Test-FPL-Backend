const mongoose = require('mongoose');
const schema = mongoose.Schema;
const MissionSchema = new schema({
    tache: {
        type: String,
        required: [true, 'Ce champs est obligatoire']
    },
    description: {
        type: String,
        required: [true, 'Ce champs est obligatoire']
    },
    datedebut: {
        type: String,
        required: [true, 'Ce champs est obligatoire']
    },
    datefin: {
        type: String,
        required: [true, 'Ce champs est obligatoire']
    },
    equipe: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
    }]
})

module.exports = mongoose.model('Mission', MissionSchema)
