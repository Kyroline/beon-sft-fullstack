import IncomeGraph from "../components/IncomeGraph"
import CardHeader from "../components/CardHeader"
import useSWR from "swr"
import axios from "axios"
import BalanceGraph from "../components/BalanceGraph"
import HouseReportTable from "../components/HouseReportTable"
import MonthPeriodPicker from "../components/form/MonthPeriodPicker"
import { useState } from "react"
import moment from "moment"
import axiosInstance from "../lib/axiosInstance"
import Input from '../components/form/Input'

const ReportPage = () => {
    const start = moment().startOf('month')
    const [year, setYear] = useState(new Date().getFullYear())
    const [period, setPeriod] = useState(`${start.format('YYYY')}-${('0' + start.format('M')).slice(-2)}`)

    const { data: incomeResponse, isLoading: incomeLoading, error: incomeError } = useSWR('/api/v1/report/incomes?year=' + year, url => axiosInstance.get(url).then(res => res.data))
    const income = incomeResponse ? incomeResponse.data.map((item) => {
        return { x: new Date(Number(item.period.split('-')[0]), Number(item.period.split('-')[1]) - 1), y: Number(item.income) }
    }) : []

    const { data: expenseResponse, isLoading: expenseLoading, error: expenseError } = useSWR('/api/v1/report/expenses?year=' + year, url => axiosInstance.get(url).then(res => res.data))
    const expense = expenseResponse ? expenseResponse.data.map((item) => {
        return { x: new Date(Number(item.period.split('-')[0]), Number(item.period.split('-')[1]) - 1), y: Number(item.expense) }
    }) : []

    const { data: balanceResponse, isLoading: balanceLoading, error: balanceError } = useSWR('/api/v1/report/balances?year=' + year, url => axiosInstance.get(url).then(res => res.data))
    const balance = balanceResponse ? balanceResponse.data.map((item) => {
        return { x: new Date(Number(item.period.split('-')[0]), Number(item.period.split('-')[1]) - 1), y: Number(item.balance) }
    }) : []

    const { data: houseResponse, isLoading: houseLoading, error: houseError } = useSWR(`/api/v1/report/house-report?year=${period.split('-')[0]}&month=${period.split('-')[1]}`, url => axiosInstance.get(url).then(res => res.data))
    const house = houseResponse ? houseResponse.data : []

    return (
        <>
            <div className="flex flex-col bg-white shadow-md p-2 m-2">
                <CardHeader>
                    <h1 className='font-bold mb-2'>Pemasukan dan Pengeluaran Bulanan</h1>
                </CardHeader>
                <div className="m-2">
                    <Input label='Tahun' type='number' value={year} onChange={e => setYear(e.target.value)} />
                    <div className="mb-2"></div>
                    <IncomeGraph data={income} data2={expense} />
                    <div className="mb-2"></div>
                    <BalanceGraph data={balance} />
                </div>
            </div>

            <div className="flex flex-col bg-white shadow-md p-2 m-2">
                <CardHeader>
                    <h1 className='font-bold mb-2'>Laporan Iuran Rumah</h1>
                </CardHeader>
                <div className="m-2">
                    <MonthPeriodPicker label='Periode' value={period} onChange={e => setPeriod(e.target.value)} />
                    <div className="mb-2"></div>
                    <HouseReportTable data={house} />
                </div>
            </div>
        </>
    )
}

export default ReportPage