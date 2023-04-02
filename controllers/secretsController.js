const User = require("../models/user");
const passport = require("passport");

exports.getHomePage = (req, res) => {
    res.render("home");
}

exports.getRegisterPage = (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect("/secrets");
    } else {
        res.render("register");
    }
}

exports.getLoginPage = (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect("/secrets");
    } else {
        res.render("login");
    }
}

exports.getSecretsPage = async (req, res) => {
    if (req.isAuthenticated()) {
        const users = await User.find({secrets: { $exists: true, $ne: [] }}, "secrets");
        let secrets = users.map(user => user.secrets);
        secrets = secrets.flat();

        res.render("secrets", {secrets: secrets});
    } else {
        res.redirect("/login");
    }
}

exports.getSubmitPage = (req, res) => {
    if (req.isAuthenticated()) {
        res.render("submit");
    } else {
        res.redirect("/login");
    }
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

exports.register = (req, res) => {
    User.register({ username: req.body.username }, req.body.password, (err) => {
        if (err) {
            console.log('error while user register!', err);
            res.redirect("/register");
        } else {
            console.log('user registered!');
            passport.authenticate("local", { failureRedirect: '/login', failureMessage: true })(req, res, () => {
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

exports.submitSecret = async (req, res) => {
    try {
        const secret = req.body.secret;
        let userSecrets = req.user.secrets;
        userSecrets.push(secret);
        const user = await User.findByIdAndUpdate(req.user._id, { $set: { secrets: userSecrets }});
        res.redirect("/secrets");
    } catch (err) {
        res.json(err);
    }
    
}

exports.authenticateWithGoogle = passport.authenticate('google', { scope: ['profile'] });

exports.authenticateWithGoogleCallback = passport.authenticate('google', { failureRedirect: '/login', successRedirect: '/secrets'});

exports.authenticateWithFacebook = passport.authenticate('facebook');

exports.authenticateWithFacebookCallback = passport.authenticate('facebook', { failureRedirect: '/login', successRedirect: '/secrets'});