import House from "./house.js"
import Occupant from "./occupant.js"
import OccupantHistory from "./occupanthistory.js"
import PaymentHistory from "./paymenthistory.js"
import ExpenseHistory from './expensehistory.js'

House.hasMany(Occupant, {
    foreignKey: 'houseId',
    as: 'occupant'
})

Occupant.belongsTo(House, {
    foreignKey: 'houseId',
    as: 'house'
})

PaymentHistory.belongsTo(House, {
    foreignKey: 'houseId',
    as: 'house'
})

PaymentHistory.belongsTo(Occupant, {
    foreignKey: 'occupantId',
    as: 'occupant'
})

OccupantHistory.belongsTo(House, {
    foreignKey: 'houseId',
    as: 'house'
})

OccupantHistory.belongsTo(Occupant, {
    foreignKey: 'occupantId',
    as: 'occupant'
})

export { House, Occupant, PaymentHistory, OccupantHistory, ExpenseHistory }