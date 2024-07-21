import { DataTypes } from "sequelize"

import sequelize from "../config/db.js"

const House = sequelize.define('House', {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: { type: DataTypes.STRING },
    occupied: { type: DataTypes.BOOLEAN },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
    }
})

House.addHook('beforeCreate', (house, option) => {
    house.createdAt = Date.now()
})

House.addHook('beforeUpdate', (house, option) => {
    house.updatedAt = Date.now()
})

export default House