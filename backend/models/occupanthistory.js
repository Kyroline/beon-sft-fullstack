import { DataTypes } from "sequelize"

import sequelize from "../config/db.js"

const OccupantHistory = sequelize.define('OccupantHistory', {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    houseId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'House',
            key: 'id'
        }
    },
    occupantId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Occupant',
            key: 'id'
        }
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE
    },
},
    { timestamps: false }
)

OccupantHistory.addHook('beforeCreate', (occupant, option) => {
    occupant.createdAt = new Date()
})


export default OccupantHistory