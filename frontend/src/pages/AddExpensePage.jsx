import { useState } from "react"
import CardHeader from "../components/CardHeader"
import Select from "../components/form/Select"
import Input from "../components/form/Input"
import Button from "../components/form/Button"
import { FaSave } from 'react-icons/fa'
import axiosInstance from "../lib/axiosInstance"
import { useNavigate } from "react-router-dom"

const paymentType = [
    {
        value: 'satpam',
        text: 'Pengeluaran Satpam'
    },
    {
        value: 'kebersihan',
        text: 'Pengeluaran Kebersihan'
    },
    {
        value: 'other',
        text: 'Lainnya'
    }
]

const AddExpensePage = () => {
    const [type, setType] = useState('')
    const [amount, setAmount] = useState(0)
    const [other, setOther] = useState('')
    const [date, setDate] = useState(new Date())

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const addExpense = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            axiosInstance.post('/api/v1/expenses', {
                type: type == 'other' ? other : type,
                amount: amount,
                date: date
            })

            navigate('/data-pengeluaran')
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <form onSubmit={addExpense}>
                <div className="flex flex-col lg:flex-row">
                    <div className="flex flex-col bg-white shadow-md p-2 m-2 w-full">
                        <CardHeader>
                            <h1 className='font-bold mb-2'>Info Pembayaran</h1>
                        </CardHeader>
                        <div className="p-2">
                            <Input value={amount} onChange={e => setAmount(prev => { return Number(e.target.value) < 0 ? 0 : e.target.value })} required={true} label='Jumlah (Rp)' type='number' />
                            <div className="mb-2"></div>
                            <Input value={date} onChange={e => setDate(e.target.value)} required={true} label='Tanggal' type='date' />
                            <div className="mb-2"></div>
                            <Select label='Tipe Pengeluaran' required={true} value={type} onChange={e => setType(e.target.value)} placeholder='Pilih jenis pengeluaran' options={paymentType} />
                            <div className="mb-2"></div>
                            {type == 'other' ? <Input required={true} value={other} onChange={e => setOther(e.target.value)} label={'Masukkan jenis pengeluaran'} /> : null}
                            <Button
                                className={'button-primary mt-2'}
                                icon={<FaSave />}
                                label='Simpan'
                                loadingReplaceIcon={true}
                                isLoading={loading}
                                isActive={!loading} />
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default AddExpensePage