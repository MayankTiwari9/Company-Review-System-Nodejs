const express = require('express');

const companyController = require('../controller/company');

const router = express.Router();

router.post('/add-company', companyController.postAddCompany);
router.post('/company', companyController.getAllComapny);

module.exports = router;