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
    submitSecret
} = require("../controllers/secretsController");


const router = express.Router();

router.route("/").get(getHomePage);

router.route("/register").get(getRegisterPage).post(register);

router.route("/login").get(getLoginPage).post(login);

router.route("/secrets").get(getSecretsPage);

router.route("/submit").get(getSubmitPage).post(submitSecret);

router.route("/logout").get(logout);

module.exports = router;