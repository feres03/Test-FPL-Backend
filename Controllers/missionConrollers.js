const employee = require('../Models/Employee');
const Mission = require('../Models/Mission');
const nodemailer = require('nodemailer');

exports.addmission = async (req, res) => {
    try {
        await Mission.create(req.body)
        res.send({ message: 'Ajouté avec succés' })
    } catch (error) {
        res.status(500).send({ message: error.message || 'error!' })
    }
}

exports.missionbyid = async (req, res) => {
    try {
        const mission = await Mission.findById(req.params.idMission).populate('employees')
        res.send({ mission })

    } catch (error) {
        res.status(500).send({ message: error.message || 'error!' })
    }
}

exports.missionlist = async (req, res) => {
    try {
        const list = await Mission.find()
        res.send({ list })

    } catch (error) {
        res.status(500).send({ message: error.message || 'error!' })
    }
}

exports.updatemission = async (req, res) => {
    try {
        await Mission.findByIdAndUpdate(req.params.id, req.body)
        res.send({ message: 'Modifié avec succés' })

    } catch (error) {
        res.status(500).send({ message: error.message || 'error!' })
    }
}

exports.deletemission = async (req, res) => {
    try {
        await Mission.findByIdAndRemove(req.params.id)
        res.send({ message: 'Supprimé avec succés' })

    } catch (error) {
        res.status(500).send({ message: error.message || 'error!' })

    }
}

exports.affecte = async (req, res) => {
    try {
        const missionFound = await Mission.findById(req.params.idMission)
        if (missionFound) {
            const dispo = await employee.findById(req.params.idEmployee)
            if (dispo.disponibilite) {
                await Mission.findByIdAndUpdate(req.params.idMission, { $push: { equipe: req.params.idEmployee } }, { new: true })
                await employee.findByIdAndUpdate(req.params.idEmployee, { disponibilite: false })
                const transporter = nodemailer.createTransport({

                    host: 'smtp.gmail.com',
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.PASSWORD
                    }
                });
                let info = await transporter.sendMail({
                    from: process.env.EMAIL,
                    to: dispo.email,
                    subject: `Bonjour ${dispo.nom},nous informons que vous etes affecté a une mission.`,
                    text: `Nous envoyons ce mail pour vous informez que votre equipe est ${missionFound.equipe} tache est ${missionFound.tache},vous etes demandé de ${missionFound.description},et le deadline : ${missionFound.datefin} , Bon travail!`,
                });
                res.send({ message: 'Mission affectée avec succés' })
            }
            else {
                res.status(400).send({ message: "Employee n'est pas disponible" })
            }
        }
    } catch (error) {
        res.status(500).send({ message: error.message || 'error!' })
    }
}

exports.dessafecte = async (req, res) => {
    try {
        const dispo = await employee.findById(req.params.idEmployee)
        await Mission.findByIdAndUpdate(req.params.idMission, { $pull: { equipe: req.params.idEmployee } }, { new: true })
        await employee.findByIdAndUpdate(req.params.idEmployee, { disponibilite: true })
        const transporter = nodemailer.createTransport({

            host: 'smtp.gmail.com',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
        let info = await transporter.sendMail({
            from: process.env.EMAIL,
            to: dispo.email,
            subject: `Bonjour ${dispo.nom},Dissafacation du mission.`,
            text: `Nous envoyons ce mail pour vous informez que vous etes dissafacté(e) de votre tache.`,
        });
        res.send({ message: 'Mission dissaffectée avec succés' })

    } catch (error) {
        res.status(500).send({ message: 'erreur serveur' || error })

    }
}