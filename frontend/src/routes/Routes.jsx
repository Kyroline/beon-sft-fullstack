import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import CreatePaymentPage from '../pages/CreatePaymentPage'
import HouseInfoPage from '../pages/HouseInfoPage'
import PaymentListPage from '../pages/PaymentListPage'
import OccupantInfoPage from '../pages/OccupantInfoPage'
import AddOccupantPage from '../pages/AddOccupantPage'
import HouseListPage from '../pages/HouseListPage'
import OccupantListPage from '../pages/OccupantListPage'
import AddHousePage from '../pages/AddHousePage'
import ReportPage from '../pages/ReportPage'
import ExpenseListPage from '../pages/ExpenseListPage'
import AddExpensePage from '../pages/AddExpensePage'

const Routes = createBrowserRouter([
    {
        path: '',
        element: <MainLayout />,
        children: [
            {
                path: 'buat-pembayaran',
                element: <CreatePaymentPage/>
            },
            {
                path: 'data-rumah',
                element: <HouseListPage />
            },
            {
                path: 'data-rumah/:id',
                element: <HouseInfoPage />
            },
            {
                path: 'data-penghuni',
                element: <OccupantListPage />
            },
            {
                path: 'data-penghuni/:id',
                element: <OccupantInfoPage />
            },
            {
                path: 'tambah-penghuni',
                element: <AddOccupantPage />
            },
            {
                path: 'tambah-rumah',
                element: <AddHousePage />
            },
            {
                path: 'data-pembayaran',
                element: <PaymentListPage />
            },
            {
                path: 'data-pengeluaran',
                element: <ExpenseListPage />
            },
            {
                path: 'tambah-pengeluaran',
                element: <AddExpensePage />
            },
            {
                path: 'laporan-keuangan',
                element: <ReportPage />
            }
        ]
    }
])

export default Routes