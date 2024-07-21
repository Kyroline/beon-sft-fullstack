import { ExpenseHistory } from '../models/parent.js'

export const index = async (req, res, next) => {
    try {
        const expenses = await ExpenseHistory.findAll()

        res.json({ data: expenses })
    } catch (error) {
        next(error)
    }
}

export const show = async (req, res, next) => {
    try {
        const expense = await ExpenseHistory.findOne({ where: { id: req.params.id } })

        res.json({ data: expense })
    } catch (error) {
        next(error)
    }
}

export const store = async (req, res, next) => {
    try {
        const {amount, type, date} = req.body
        const expense = await ExpenseHistory.create({ amount: amount, type: type, date: date })

        res.json({ data: expense })
    } catch (error) {
        next(error)
    }
}

export const update = async (req, res, next) => {
    try {
        const expense = await ExpenseHistory.update({ amount: amount, type: type }, { where: { id: req.params.id } })

        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
}

export const destroy = async (req, res, next) => {
    try {
        await ExpenseHistory.destroy({ where: { id: req.params.id } })

        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
}