import { DataTypes } from "sequelize"

import sequelize from "../config/db.js"

const PaymentHistory = sequelize.define('PaymentHistory', {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    houseId: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
            model: 'House',
            key: 'id'
        }
    },
    occupantId: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
            model: 'Occupant',
            key: 'id'
        }
    },
    type: {
        type: DataTypes.STRING,
    },
    amount: {
        type: DataTypes.BIGINT
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    createdAt: {
        allowNull: true,
        type: DataTypes.DATE
    },
    updatedAt: {
        allowNull: true,
        type: DataTypes.DATE
    },
})

PaymentHistory.addHook('beforeCreate', (e, option) => {
    e.createdAt = Date.now()
    e.updatedAt = Date.now()
})
PaymentHistory.addHook('beforeUpdate', (e, option) => {
    e.updatedAt = Date.now()
})


export default PaymentHistory