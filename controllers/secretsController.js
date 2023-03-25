const secretsServices = require("../services/secretsServices");

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
        const newUser = {
            email: req.body.username,
            password: req.body.password
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
        const password = req.body.password;

        const user = await secretsServices.checkUser(email);

        if (user) {
            if (user.password === password) {
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