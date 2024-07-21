import { DataTypes } from "sequelize"

import sequelize from "../config/db.js"

const Occupant = sequelize.define('Occupant', {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    houseId: {
        type: DataTypes.UUID,
        references: {
            model: 'House',
            key: 'id'
        }
    },
    nik: {
        unique: true,
        type: DataTypes.STRING,
        allowNull: false
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ktp: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    occupacyStatus: {
        type: DataTypes.STRING,
        allowNull: false
    },
    maritalStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
    }
})

Occupant.addHook('beforeCreate', (occupant, option) => {
    occupant.createdAt = Date.now()
    occupant.updatedAt = Date.now()
})

Occupant.addHook('beforeUpdate', (occupant, option) => {
    occupant.updatedAt = Date.now()
})


export default Occupant