import { QueryTypes } from "sequelize"
import sequelize from "../config/db.js"

export const showIncome = async (req, res, next) => {
    try {
        const year = req.query.year ?? new Date().getFullYear()
        const income = await sequelize.query(
            `SELECT DATE_FORMAT(startDate, '%Y-%m') AS period, SUM(amount) as income
            FROM paymenthistories
            WHERE DATE_FORMAT(startDate, '%Y') = :year
            GROUP BY period
            ORDER BY period;`,
            {
                replacements: { year: year },
                type: QueryTypes.SELECT
            }
        )
        res.json({ data: income })
    } catch (error) {
        next(error)
    }
}

export const showExpense = async (req, res, next) => {
    try {
        const year = req.query.year ?? new Date().getFullYear()
        const expense = await sequelize.query(
            `SELECT DATE_FORMAT(date, '%Y-%m') AS period, SUM(amount) as expense
            FROM expensehistories
            WHERE DATE_FORMAT(date, '%Y') = :year
            GROUP BY period
            ORDER BY period;`,
            {
                replacements: { year: year },
                type: QueryTypes.SELECT
            }
        )

        res.json({ data: expense })
    } catch (error) {
        next(error)
    }
}

export const showBalance = async (req, res, next) => {
    try {
        const year = req.query.year ?? new Date().getFullYear()
        const balance = await sequelize.query(
            `SELECT 
                period,
                COALESCE(SUM(income), 0) AS income,
                COALESCE(SUM(expense), 0) AS expense,
                (COALESCE(SUM(income), 0) - COALESCE(SUM(expense), 0)) AS balance
            FROM (
                SELECT 
                    DATE_FORMAT(date, '%Y-%m') AS period, 
                    0 AS income, 
                    SUM(amount) AS expense
                FROM expensehistories
                WHERE DATE_FORMAT(date, '%Y') = :year
                GROUP BY period
                UNION ALL
                SELECT 
                    DATE_FORMAT(startDate, '%Y-%m') AS period, 
                    SUM(amount) AS income, 
                    0 AS expense
                FROM paymenthistories
                WHERE DATE_FORMAT(startDate, '%Y') = :year
                GROUP BY period
            ) AS combined
            GROUP BY period
            ORDER BY period;`,
            {
                replacements: { year: year },
                type: QueryTypes.SELECT
            }
        )

        res.json({ data: balance })
    } catch (error) {
        next(error)
    }
}

export const houseReport = async (req, res, next) => {
    try {
        const house = await sequelize.query(`
        SELECT houses.*, 
               COALESCE(satpam_paid.satpam, false) AS satpam_paid, 
               COALESCE(kebersihan_paid.kebersihan, false) AS kebersihan_paid
        FROM houses
        LEFT JOIN (
            SELECT houseId, true AS satpam
            FROM paymenthistories
            WHERE (startDate <= :date AND endDate >= :date)
              AND type = 'satpam'
            GROUP BY houseId
        ) AS satpam_paid ON houses.id = satpam_paid.houseId
        LEFT JOIN (
            SELECT houseId, true AS kebersihan
            FROM paymenthistories
            WHERE (startDate <= :date AND endDate >= :date)
              AND type = 'kebersihan'
            GROUP BY houseId
        ) AS kebersihan_paid ON houses.id = kebersihan_paid.houseId
        WHERE occupied = true
        ORDER BY kebersihan_paid ASC, satpam_paid ASC;`,
            /*
            // gunakan ketika cuma mau ditampilin yang belum bayar aja. 
            AND (COALESCE(satpam_paid.satpam, false) = false
                OR COALESCE(kebersihan_paid.kebersihan, false) = false)
            */
            {
                replacements: { date: `${req.query.year}-${req.query.month}-02` },
                type: QueryTypes.SELECT
            }
        )

        res.json({ data: house })
    } catch (error) {
        next(error)
    }
} 