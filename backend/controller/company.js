const Company = require('../model/company');

exports.postAddCompany = (req, res, next) => {
    const name = req.body.name;
    const pros = req.body.pros;
    const cons = req.body.cons;
    const rating = req.body.rating;

    Company.create({
        name: name,
        pros: pros,
        cons: cons,
        rating: rating
    })
    .then(() => {
        res.status(201).json({message: 'Company Created Successfully'})
    })
    .catch((err) => {
        console.log(err);
    })
}