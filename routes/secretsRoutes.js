const express = require("express");
const {
    getHomePage,
    getRegisterPage,
    getLoginPage,
    getSecretsPage,
    getSubmitPage,
    logout,
    register,
    login,
    submitSecret,
    authenticateWithGoogle,
    authenticateWithGoogleCallback,
    authenticateWithFacebook,
    authenticateWithFacebookCallback
} = require("../controllers/secretsController");


const router = express.Router();

router.route("/").get(getHomePage);

router.route("/register").get(getRegisterPage).post(register);

router.route("/login").get(getLoginPage).post(login);

router.route("/secrets").get(getSecretsPage);

router.route("/submit").get(getSubmitPage).post(submitSecret);

router.route("/logout").post(logout);

router.route("/auth/google").get(authenticateWithGoogle);

router.route("/auth/google/secrets").get(authenticateWithGoogleCallback);

router.route("/auth/facebook").get(authenticateWithFacebook);

router.route("/auth/facebook/secrets").get(authenticateWithFacebookCallback);

module.exports = router;