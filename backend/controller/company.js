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

exports.getAllComapny = (req, res, next) => {
    const name = req.body.company;
    console.log(req.body);
    Company.findAll({where: {name: name}})
    .then((company) => {
        if(company.length === 0){
            return res.status(404).json({message: 'Company Not Found'})
        }
        return res.status(200).json(company)
    })
    .catch((err) => {
        console.log(err);
    })
}