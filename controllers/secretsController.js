const secretsServices = require("../services/secretsServices");
// const md5 = require("md5"); Lvl 3
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.getHomePage = (req, res) => {
    res.render("home");
}

exports.getRegisterPage = (req, res) => {
    res.render("register");
}

exports.getLoginPage = (req, res) => {
    res.render("login");
}

exports.getSecretsPage = (req, res) => {
    res.render("secrets");
}

exports.getSubmitPage = (req, res) => {
    res.render("submit");
}

exports.logout = (req, res) => {
    res.redirect("/");
}

exports.register = async (req, res) => {
    try {
        const hash_password = await bcrypt.hash(req.body.password, saltRounds);

        const newUser = {
            email: req.body.username,
            // password: md5(req.body.password) Level 3
            password: hash_password
        };
        const user = await secretsServices.registerUser(newUser);
        res.redirect("/secrets");
    } catch (err) {
        res.json(err);
    }
}

exports.login = async (req, res) => {
    try {

        const email = req.body.username;
        // const password = md5(req.body.password); Level 3

        const user = await secretsServices.checkUser(email);

        if (user) {
            const match = await bcrypt.compare(req.body.password, user.password);
            // if (user.password === password) { Level 3
            if (match) {
                res.redirect("/secrets");
            } else {
                console.log("wrong password");
                res.redirect("/login");
            }
        } else {
            console.log("unknown email address");
            res.redirect("/login");
        }
    } catch (err) {
        res.json(err);
    }
}

exports.submitSecret = (req, res) => {
    res.redirect("/secrets");
}