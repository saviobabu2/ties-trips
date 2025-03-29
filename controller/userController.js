const mongoose = require("mongoose");
const express = require("express");



const renderLandingPage = (req, res) => {
    res.render('user/pages/landingPage', { title: 'Explore Tour Packages' });
  };
  
  module.exports = {
    renderLandingPage
  };