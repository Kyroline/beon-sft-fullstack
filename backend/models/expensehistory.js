import { DataTypes } from "sequelize"

import sequelize from "../config/db.js"

const ExpenseHistory = sequelize.define('ExpenseHistory', {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    amount: {
        type: DataTypes.BIGINT
    },
    type: {
        type: DataTypes.STRING
    },
    date: {
        allowNull: false,
        type: DataTypes.DATE
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
    },
})

ExpenseHistory.addHook('beforeCreate', (e, option) => {
    e.createdAt = Date.now()
    e.updatedAt = Date.now()
})
ExpenseHistory.addHook('beforeUpdate', (e, option) => {
    e.updatedAt = Date.now()
})


export default ExpenseHistory