const Employee = require('../Models/Employee');

exports.addemployee = async (req, res) => {
    try {
        await Employee.create(req.body)
        res.send({ message: 'Ajouté avec succéss' })

    } catch (error) {
        res.status(500).send({ message: 'erreur serveur' || error })
    }
}

exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.idEmployee)

        res.send({ employee })
    } catch (error) {
        res.status(500).send({ message: 'erreur serveur' || error })

    }
}

exports.employeelist = async (req, res) => {
    try {
        const list = await Employee.find()
        res.send({ list })
    } catch (error) {
        res.status(500).send({ message: 'erreur serveur' || error })
    }
}


exports.updateemployee = async (req, res) => {
    try {
        await Employee.findByIdAndUpdate(req.params.id, req.body)
        res.send({ message: 'Modifié avec succéss' })
    } catch (error) {
        res.status(500).send({ message: 'erreur serveur' || error })
    }
}

exports.deleteemployee = async (req, res) => {
    try {
        await Employee.findByIdAndRemove(req.params.id)
        res.send({ message: 'Supprimé avec succéss' })

    } catch (error) {
        res.status(500).send({ message: 'erreur serveur' || error })
    }
}