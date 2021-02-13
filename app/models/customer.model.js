

module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define('customer', {
        id: {
            type : Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        totalAmount : {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        currentAmount: {
            type: Sequelize.DOUBLE,
        },
        collectionAmount : {
            type: Sequelize.DOUBLE,
        },
        registerId : {
            type : Sequelize.STRING
        }
    });
    return Customer;
}; 

