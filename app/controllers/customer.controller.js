const db = require("../models");
const Customer = db.customer;
const app = require('../../app');



exports.getCustomers = (req, res) => {
    Customer.findAll().then(result => {
        res.status(200).json(result)
    })
}

exports.getCustomersTotalAmountAndCollection = (req, res) => {
    Customer.findAll().then(result => {
        let totalAmount = 0;
        let totalCollection = 0;
        for (const index in result) {
            totalAmount += result[index]._previousDataValues.totalAmount;
            totalCollection += result[index]._previousDataValues.collectionAmount;
        }
        res.status(200).json([totalAmount, totalCollection])
    })
}

exports.addCollection = (req, res) => {
    const collection = req.body.collection;
    Customer.findAll({
        where: {
            name: req.query.name,
            totalAmount: req.query.totalAmount
        }
    }).then((result) => {
        const collectionAmount = result[0]._previousDataValues.collectionAmount;
        Customer.update({
            collectionAmount: parseInt(collectionAmount) + parseInt(collection),
        },
            {
                where: {
                    name: req.query.name,
                    totalAmount: req.query.totalAmount
                }
            }).then((result) => {
                res.status(200).json({
                    message: 'Collection added successfully.',
                    success: true
                })
            }).catch(err => {
                console.log(err);
                res.status(400).json({
                    message: 'There was a problem adding the collection.',
                    success: false,
                    err
                })
            })
    }).catch(err => {
        console.log(err);
        res.status(400).json({
            message: 'There was a problem getting the collection.',
            success: false,
            err
        })
    });
}

exports.getCustomerByName = (req, res) => {
    Customer.findAll({
        where: {
            name: req.params.name,
        }
    }).then(result => {
        res.status(200).json(result)
    })
}

exports.addCustomer = (req, res) => {
    Customer.create({
        name: req.body.name,
        totalAmount: req.body.totalAmount,
        collectionAmount: req.body.collectionAmount,
        currentAmount: req.body.totalAmount - req.body.collectionAmount,
        registerId: req.body.registerId
    }).then((newCustomer) => {
        res.status(201).json({
            message: "Customer successfully added.",
            success: true
        })
    }).catch(err => {
        res.status(400).json({
            message: "There was a problem adding customers.",
            success: false,
            err
        })
    })
}

