import { Router } from 'express'
import * as Occupant from '../controllers/occupant.js'
import * as House from '../controllers/house.js'
import * as Payment from '../controllers/paymentHistory.js'
import * as Report from '../controllers/report.js'
import * as Expense from '../controllers/expenseHistory.js'
import { upload } from '../middlewares/multer.js'
import { uploadFile } from '../controllers/storage.js'

const api = Router()

api.post('/upload', upload.single('file'), uploadFile)

api.get('/occupants', Occupant.index)
api.get('/occupants/:id', Occupant.show)
api.put('/occupants/:id', Occupant.update)
api.patch('/occupants/:id', Occupant.update)
api.post('/occupants', Occupant.store)

api.get('/payments', Payment.index)
api.get('/payments/:id', Payment.show)
api.put('/payments/:id', Payment.update)
api.patch('/payments/:id', Payment.update)
api.post('/payments', Payment.store)
api.delete('/payments/:id', Payment.destroy)

api.get('/expenses', Expense.index)
api.get('/expenses/:id', Expense.show)
api.put('/expenses/:id', Expense.update)
api.patch('/expenses/:id', Expense.update)
api.post('/expenses', Expense.store)
api.delete('/expenses/:id', Expense.destroy)

api.get('/houses', House.index)
api.get('/houses/:id/occupant-histories', House.occupantHistory)
api.get('/houses/:id', House.show)
api.put('/houses/:id', House.update)
api.patch('/houses/:id', House.update)
api.post('/houses', House.store)
api.delete('/houses/:id/occupants/:occupantId', House.removeOccupant)

api.get('/report/incomes', Report.showIncome)
api.get('/report/expenses', Report.showExpense)
api.get('/report/balances', Report.showBalance)
api.get('/report/house-report', Report.houseReport)

export default api