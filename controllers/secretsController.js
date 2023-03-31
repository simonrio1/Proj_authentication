// const secretsServices = require("../services/secretsServices");
const User = require("../models/user");
const passport = require("passport");
// const md5 = require("md5"); Lvl 3
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.getHomePage = (req, res) => {
    res.render("home");
}

exports.getRegisterPage = (req, res) => {
    if (req.isAuthenticated()) {
        console.log("Already authenticated");
        res.redirect("/secrets");
    } else {
        res.render("register");
    }
}

exports.getLoginPage = (req, res) => {
    if (req.isAuthenticated()) {
        console.log("Already authenticated");
        res.redirect("/secrets");
    } else {
        res.render("login");
    }
}

exports.getSecretsPage = (req, res) => {
    if (req.isAuthenticated()) {
        console.log(req.user);
        res.render("secrets");
    } else {
        console.log(req.user);
        console.log("not authenticated");
        res.redirect("/login");
    }
}

exports.getSubmitPage = (req, res) => {
    res.render("submit");
}

exports.logout = (req, res) => {
    req.logout(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
}

exports.register = async (req, res) => {
    User.register({ username: req.body.username }, req.body.password, (err) => {
        if (err) {
            console.log('error while user register!', err);
            res.redirect("/register");
        } else {
            console.log('user registered!');
            passport.authenticate("local", { failureRedirect: '/login', failureMessage: true })(req, res, () => {
                console.log(req.user);
                res.redirect('/secrets');
            });

        }
    });
}

exports.login = (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    req.login(user, function (err) {
        if (err) {
            console.log(err);
            res.redirect('/login');
        } else {
            passport.authenticate('local', { failureRedirect: '/login', failureMessage: true })(req, res, () => {
                console.log(req.user);
                res.redirect('/secrets');
            });
        }
    });
}

exports.submitSecret = (req, res) => {
    res.redirect("/secrets");
}