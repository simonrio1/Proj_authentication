require('dotenv').config();
const mongoose = require("mongoose");

// const encrypt = require("mongoose-encryption"); Level 2

const userSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true}
});

// userSchema.plugin(encrypt, {secret: process.env.USER_ENC_KEY, encryptedFields: ['password']}); Level 2

module.exports = mongoose.model("User", userSchema);