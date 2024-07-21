import { Occupant, House, OccupantHistory } from "../models/parent.js"
import { NotFoundError } from "../utils/apiError.js"
import path from 'path'
import { fileURLToPath } from 'url'
import * as fsPromises from "fs/promises"
import { Op } from "sequelize"
import sequelize from "../config/db.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const index = async (req, res, next) => {
    try {
        const occupant = await Occupant.findAll({ include: { model: House, as: 'house' }, })

        res.json({ data: occupant })
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const { id } = req.params
        const occupant = await Occupant.findOne({ where: { nik: id }, include: { model: House, as: 'house' } })

        if (!occupant)
            throw new NotFoundError('Occupant NIK not found!')

        res.json({ data: occupant })
    } catch (error) {
        next(error)
    }
}

const store = async (req, res, next) => {
    const transaction = await sequelize.transaction()
    try {
        const { nik, fullName, houseId, occupacyStatus, ktp, phone, maritalStatus } = req.body

        let filename = 'KTP_' + Date.now() + path.extname(ktp)
        const tmpPath = path.resolve(__dirname, '..', 'public', 'tmp', ktp)
        const newPath = path.resolve(__dirname, '..', 'public', filename)

        const newOccupant = await Occupant.create({
            nik: nik,
            fullName: fullName,
            houseId: houseId,
            ktp: filename,
            occupacyStatus: occupacyStatus,
            phone: phone,
            maritalStatus: maritalStatus
        }, { transaction })

        console.log(`ID BARU ${newOccupant.id}`)

        await fsPromises.rename(tmpPath, newPath)

        const occupiedHouse = await House.update({ occupied: true }, { where: { id: houseId }, transaction: transaction })
        const occupantHistory = await OccupantHistory.create({ occupantId: newOccupant.id, houseId: houseId, type: 'Menempati', createdAt: new Date() }, { transaction: transaction })

        await transaction.commit()

        return res.json({ data: newOccupant })
    } catch (error) {
        await transaction.rollback()
        next(error)
    }
}

const update = async (req, res, next) => {
    const t = await sequelize.transaction()
    try {

        const { nik, fullName, houseId, occupacyStatus, ktp, phone, maritalStatus } = req.body

        const occupant = await Occupant.findOne({ where: { nik: req.params.id } })

        if (!occupant)
            throw new NotFoundError('Occupant NIK not found')

        if (ktp) {
            let filename = 'KTP_' + Date.now() + path.extname(ktp)
            const tmpPath = path.resolve(__dirname, '..', 'public', 'tmp', ktp)
            const newPath = path.resolve(__dirname, '..', 'public', filename)

            await fsPromises.rename(tmpPath, newPath)
            occupant.ktp = filename
        }

        const occupantExceptSelf = await Occupant.findAll({ where: { houseId: occupant.houseId, nik: { [Op.ne]: req.params.id } } })
        if (occupantExceptSelf.length == 0)
            await House.update({ occupied: false }, { where: { id: occupant.houseId }, transaction: t })

        if (occupacyStatus != 'Tidak Ada' && occupant.houseId != houseId) {
            if (occupant.houseId)
                await OccupantHistory.create({ occupantId: occupant.id, houseId: occupant.houseId, type: 'Pindah', createdAt: new Date() }, { transaction: t })
            occupant.houseId = houseId
            await OccupantHistory.create({ occupantId: occupant.id, houseId: houseId, type: 'Menempati', createdAt: new Date() }, { transaction: t })
        }


        occupant.nik = nik
        occupant.fullName = fullName
        occupant.occupacyStatus = occupacyStatus
        occupant.phone = phone
        occupant.maritalStatus = maritalStatus

        await House.update({ occupied: true }, { where: { id: houseId }, transaction: t })

        await occupant.save({ transaction: t })

        await t.commit()
        return res.json({ data: occupant })
    } catch (error) {
        await t.rollback()
        next(error)
    }
}

export { index, show, store, update }