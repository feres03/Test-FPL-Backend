const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const Admin = require('../Models/Admin');
const Token = require('../Models/Token');
const Randomstring = require('randomstring');

exports.Register = async (req, res) => {
    try {
        const found = await Admin.findOne({ email: req.body.email })
        if (found) {
            res.status(400).send({ message: 'Cet email est déja utilisé' })
        }
        else {
            const salt = bcrypt.genSaltSync(10);
            req.body.password = bcrypt.hashSync(req.body.password, salt);
            await Admin.create(req.body)
            res.send({ message: "Admin ajouté." })
        }
    } catch (error) {
        res.status(500).send({ message: 'erreur serveur' || 'Error' })
    }
}

exports.login = async (req, res) => {
    try {
        const found = await Admin.findOne({ email: req.body.email })

        if (found) {
            const valid = bcrypt.compareSync(req.body.password, found.password)
            if (valid) {
                const data = {
                    adminname: found.nom,
                    adminemail: found.email,
                    adminId: found._id
                }
                const token = jwt.sign(data, process.env.JWTSECRET, { expiresIn: "1d" });
                res.status(200).send({ message: 'Vous etes connecté!', token })
            }
            else {
                res.status(400).send({ message: 'Verifiez votre email et password!' })
            }
        }
        else {
            res.status(400).send({ message: 'Verifiez votre email et password!' })
        }
    } catch (error) {
        res.status(500).send({ message: 'erreur serveur' || error })
    }
}

exports.forgetPassword = async (req, res) => {
    try {
        const found = await Admin.findOne({ email: req.body.email })
        if (found) {
            const token = await Token.findOne({ userId: found._id })
            if (token) {
                await token.deleteOne()
            }
            const resetToken = Randomstring.generate(20)
            const createdToken = await new Token({
                adminId: found._id,
                token: resetToken,
            }).save();
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            })
            const resetLink = 'http://localhost:3000/resetPassword/' + resetToken
            await transporter.sendMail({
                from: process.env.EMAIL,
                to: req.body.email,
                subject: `Un mail de réinitialisation de mot de passe pour: ${found.nom} .`,
                html: `<h1>Vous avez demandé de réinitialiser votre mot de passe, donc voilà ton lien de réinitialisation ici:</h1>
                  <a href='${resetLink}'></a>`
            })
            res.send({ message: 'Mail de réinitialisation de mot de passe est envoyé avec succés.' })
        } else {
            res.status(400).send({ message: 'Email introuvable,verifiez votre email et essayez une autre fois!' })
        }
    } catch (error) {
        res.status(500).send({ message: 'erreur serveur' || error })
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const token = await Token.findOne({ token: req.params.token })
        if (token) {
            const diffDate = new Date() - token.createdAt;
            const diffSeconds = Math.floor(diffDate / 1000);
            if (diffSeconds < 3600) {
                const saltRounds = bcrypt.genSaltSync(10);
                bcrypt.hash(req.body.password, saltRounds, async (error, hash) => {
                    if (error) {
                        res.status(500).send({ message: 'erreur serveur' || error })
                    } else {
                        await user.findByIdAndUpdate(token.userId, { password: hash }, { new: true })
                        res.send({ message: 'Votre mot de passe est réinitialisé.' });
                    }
                })
                await Token.findByIdAndRemove(token._id)
            } else {
                await Token.findByIdAndRemove(token._id)
                res.status(400).send({ message: 'Token expiré!' });
            }
        } else {
            res.status(400).send({ message: 'Token invalide !' });
        }
    } catch (error) {
        res.status(500).send({ message: 'erreur serveur' || error })
    }
}

exports.getadmin = async (req, res) => {
    try {
        const admins = await Admin.find()
        res.status(200).send({ admins })
    } catch (error) {
        res.status(500).send({ message: 'erreur serveur' || error })
    }
}

exports.updateadmin = async (req, res) => {
    try {
        await Admin.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).send({ message: `Les cordonnées d'admin sont modifiées.` })
    } catch (error) {
        res.status(500).send({ message: 'erreur serveur' || error })
    }
}

exports.deleteadmin = async (req, res) => {
    try {
        await Admin.findByIdAndDelete(req.params.id)
        res.status(200).send({ message: 'Admin supprimé' })
    } catch (error) {
        res.status(500).send({ message: 'erreur serveur' || error })
    }
}