const secretsServices = require("../services/secretsServices");
const User = require("../models/user");
const passport = require("passport");
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
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
}

exports.register = async (req, res) => {
    console.log(req.body.username);
    User.register({ username: req.body.username }, req.body.password, (err) => {
        if (err) {
            console.log('error while user register!', err);
            res.redirect("/register");
        } else {
            console.log('user registered!');
            passport.authenticate("local",{ failureRedirect: '/login', failureMessage: true })(req, res, () => {
                console.log(req.user);
                res.redirect('/secrets');
            });
            
        }
    });
}

exports.login = (req, res) => {
    // try {

    //     const email = req.body.username;

    //     const user = await secretsServices.checkUser(email);

    //     if (user) {
    //         const match = await bcrypt.compare(req.body.password, user.password);
    //         if (match) {
    //             res.redirect("/secrets");
    //         } else {
    //             console.log("wrong password");
    //             res.redirect("/login");
    //         }
    //     } else {
    //         console.log("unknown email address");
    //         res.redirect("/login");
    //     }
    // } catch (err) {
    //     res.json(err);
    // }
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    req.login(user, function(err) {
        if (err) {
            console.log(err);
            res.redirect('/login'); 
        } else {
            passport.authenticate('local',{ failureRedirect: '/login', failureMessage: true })(req, res, () => {
                console.log(req.user);
                res.redirect('/secrets');
            });
        }
      });
}

exports.submitSecret = (req, res) => {
    res.redirect("/secrets");
}