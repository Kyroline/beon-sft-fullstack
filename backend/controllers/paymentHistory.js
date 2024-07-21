import { PaymentHistory, House, Occupant } from '../models/parent.js'

export const index = async (req, res, next) => {
    try {
        let payments

        if (req.query.house)
            payments = await PaymentHistory.findAll({ where: { houseId: req.query.house }, include: [{ model: House, as: 'house' }, { model: Occupant, as: 'occupant' }] })
        else
            payments = await PaymentHistory.findAll({ include: [{ model: House, as: 'house' }, { model: Occupant, as: 'occupant' }] })

        res.json({ data: payments })
    } catch (error) {
        next(error)
    }
}

export const show = async (req, res, next) => {
    try {
        const payment = await PaymentHistory.findOne({ where: { id: req.params.id } })

        res.json({ data: payment })
    } catch (error) {
        next(error)
    }
}

export const store = async (req, res, next) => {
    try {
        const { houseId, occupantId, type, amount, startDate, endDate } = req.body
        console.log(startDate)
        console.log(endDate)

        const newPayment = await PaymentHistory.create({
            houseId: houseId,
            occupantId: occupantId,
            type: type,
            amount: amount,
            startDate: startDate,
            endDate: endDate
        })

        res.json({ data: newPayment })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const update = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
}

export const destroy = async (req, res, next) => {
    try {
        const result = await PaymentHistory.destroy({ where: { id: req.params.id } })

        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
}