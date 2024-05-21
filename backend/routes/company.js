const express = require('express');

const companyController = require('../controller/company');

const router = express.Router();

router.post('/add-company', companyController.postAddCompany);

module.exports = router;