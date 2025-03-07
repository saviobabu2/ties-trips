const mongoose = require("mongoose");
const express = require("express");



const renderLandingPage = (req, res) => {

    res.render('./user/pages/landingPage'); // 'landing-page' is the name of the EJS template
  };
  
  module.exports = {
    renderLandingPage
  };