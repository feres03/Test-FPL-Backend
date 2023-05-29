const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    adminId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Admin",
    },
    token: {
        type: String,
        required: true,
    }
}, {
    timestamps: true, versionKey: false
});

module.exports = mongoose.model("token", tokenSchema);