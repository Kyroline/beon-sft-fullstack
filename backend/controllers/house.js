import sequelize from "../config/db.js"
import { House, Occupant, OccupantHistory } from "../models/parent.js"
import { NotFoundError } from "../utils/apiError.js"
import { Op } from "sequelize"
import path from 'path'
import { fileURLToPath } from 'url'
import * as fsPromises from "fs/promises"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const index = async (req, res, next) => {
    try {
        const house = await House.findAll({ include: { model: Occupant, as: 'occupant' } })

        res.json({ data: house })
    } catch (error) {
        next(error)
    }
}

export const show = async (req, res, next) => {
    try {
        const house = await House.findOne({ where: { code: req.params.id }, include: { model: Occupant, as: 'occupant' } })

        res.json({ data: house })
    } catch (error) {
        next(error)
    }
}

export const store = async (req, res, next) => {
    const t = await sequelize.transaction()
    try {
        const { code, address, image } = req.body

        let filename = 'RUMAH_' + Date.now() + path.extname(image)
        const tmpPath = path.resolve(__dirname, '..', 'public', 'tmp', image)
        const newPath = path.resolve(__dirname, '..', 'public', filename)

        const newHouse = await House.create({ code: code, address: address, image: filename }, { transaction: t })

        await fsPromises.rename(tmpPath, newPath)
        await t.commit()
        res.json({ data: newHouse })
    } catch (error) {
        await t.rollback()
        next(error)
    }
}

export const update = async (req, res, next) => {
    const t = await 
    sequelize.transaction()
    try {
        const { code, address, image } = req.body
        const updatedHouse = await House.findOne({ where: { code: req.params.id }, transaction: t })
        updatedHouse.code = code
        updatedHouse.address = address
        if (image) {
            let filename = 'RUMAH_' + Date.now() + path.extname(image)
            const tmpPath = path.resolve(__dirname, '..', 'public', 'tmp', image)
            const newPath = path.resolve(__dirname, '..', 'public', filename)

            await fsPromises.rename(tmpPath, newPath)
            updatedHouse.image = filename
        }
        await updatedHouse.save({ transaction: t })
        await t.commit()

        res.json({ data: updatedHouse })
    } catch (error) {
        await t.rollback()
        next(error)
    }
}

export const addOccupant = async (req, res, next) => {
    const t = sequelize.transaction()
    try {
        const { occupantNik } = req.body
        const { houseCode } = req.params.id

        const house = await House.findOne({ where: { code: houseCode }, transaction: t })
        if (!house)
            throw new NotFoundError('House Code not found')

        await Occupant.update({ houseId: house.id }, { where: { nik: occupantNik }, transaction: t })

        house.occupied = true
        await house.save()
    } catch (error) {
        next(error)
    }
}

export const removeOccupant = async (req, res, next) => {
    const t = await sequelize.transaction()
    try {
        const occupantNik = req.params.occupantId
        const houseCode = req.params.id

        const house = await House.findOne({ where: { code: houseCode }, transaction: t })
        if (!house)
            throw new NotFoundError('House Code not found')

        const occupant = await Occupant.findOne({ where: { nik: occupantNik }, transaction: t })
        if (!occupant)
            throw new NotFoundError('Occupant NIK not found')

        const occupantExceptSelf = await Occupant.findAll({ where: { houseId: occupant.houseId, nik: { [Op.ne]: occupantNik } }, transaction: t })
        if (occupantExceptSelf.length == 0) {
            house.occupied = false
            await house.save()
        }
        await OccupantHistory.create({occupantId: occupant.id, houseId: house.id, type: 'Pindah', createdAt: new Date()})

        occupant.houseId = null
        occupant.occupacyStatus = 'Tidak ada'
        await occupant.save()
        await t.commit()

    } catch (error) {
        await t.rollback()
        next(error)
    }
}

export const occupantHistory = async (req, res, next) => {
    try {
        const house = await House.findOne({ where: { code: req.params.id } })
        const result = await OccupantHistory.findAll({ where: { houseId: house.id }, include: { model: Occupant, as: 'occupant' }, order: [['createdAt', 'DESC']] })

        res.json({ data: result })
    } catch (error) {
        next(error)
    }
}