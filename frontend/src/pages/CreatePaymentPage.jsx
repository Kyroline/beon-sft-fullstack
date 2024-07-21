import { useEffect, useState } from "react"
import MonthPeriodPicker from "../components/form/MonthPeriodPicker"
import CardHeader from "../components/CardHeader"
import Select from "../components/form/Select"
import Input from "../components/form/Input"
import Button from "../components/form/Button"
import { FaSave } from 'react-icons/fa'
import useSWR from "swr"
import moment from "moment"
import axiosInstance from "../lib/axiosInstance"

const paymentType = [
    {
        value: 'satpam',
        text: 'Iuran Satpam'
    },
    {
        value: 'kebersihan',
        text: 'Iuran Kebersihan'
    },
    {
        value: 'other',
        text: 'Lainnya'
    }
]

const periodSelect = [
    {
        value: 1,
        text: '1 Bulan'
    },
    {
        value: 3,
        text: '3 Bulan'
    },
    {
        value: 6,
        text: '6 Bulan'
    },
    {
        value: 9,
        text: '9 Bulan'
    },
    {
        value: 12,
        text: '1 Tahun'
    }
]

const CreatePaymentPage = () => {
    const [house, setHouse] = useState('')
    const [occupant, setOccupant] = useState('')
    const [type, setType] = useState('')
    const [other, setOther] = useState('')
    const [amount, setAmount] = useState(0)
    const start = moment().startOf('month')
    const end = moment().endOf('month')
    const [startPeriod, setStartPeriod] = useState(`${start.format('YYYY')}-${('0' + start.format('M')).slice(-2)}`)
    const [endPeriod, setEndPeriod] = useState(`${end.format('YYYY')}-${('0' + end.format('M')).slice(-2)}`)

    const [loading, setLoading] = useState(false)

    const { data: houseResponse, isLoading: houseLoading, error: houseError } = useSWR('/api/v1/houses?occupied=1', url => axiosInstance.get(url).then(res => res.data))
    const houseData = houseResponse ? houseResponse.data : []

    const { data: occupantResponse, isLoading: occupantLoading, error: occupantError } = useSWR(house != '' ? `/api/v1/houses/${house.split('***')[1]}` : null, url => axiosInstance.get(url).then(res => res.data))
    const occupantData = occupantResponse ? occupantResponse.data.occupant : []

    const addPayment = async (e) => {
        e.preventDefault()
        console.log(startPeriod)
        console.log(endPeriod)

        const start1 = new Date(Date.UTC(Number(startPeriod.split('-')[0]), Number(startPeriod.split('-')[1]) - 1, 1))
        const end1 = new Date(Date.UTC(Number(endPeriod.split('-')[0]), Number(endPeriod.split('-')[1]), 0))

        try {
            axiosInstance.post('/api/v1/payments', {
                houseId: house.split('***')[0],
                occupantId: occupant.split('***')[0],
                type: type == 'other' ? other : type,
                amount: amount,
                startDate: start1,
                endDate: end1
            })
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }

    const addMonth = (e) => {
        const currentDate = new Date()
        const newUTCDate = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth() + e))
        const year = newUTCDate.getUTCFullYear()
        const month = ('0' + (newUTCDate.getUTCMonth() + 1)).slice(-2)
        setEndPeriod(`${year}-${month}`)

        // const newDate = new Date(new Date().setMonth(new Date().getMonth() + e))
        // setEndPeriod(`${newDate.getFullYear()}-${('0' + newDate.getMonth()).slice(-2)}`)
    }

    return (
        <>
            <form onSubmit={addPayment}>
                <div className="flex flex-col lg:flex-row">
                    <div className="flex flex-col bg-white shadow-md p-2 m-2 lg:w-1/2">
                        <CardHeader>
                            <h1 className='font-bold mb-2'>Info Pembayaran</h1>
                        </CardHeader>
                        <div className="p-2">
                            <Select label='Kode Rumah' required={true} value={house} onChange={e => setHouse(e.target.value)} placeholder='Pilih hunian' options={houseData.map((item) => { return { value: item.id + '***' + item.code, text: `${item.code} - ${item.address}` } })} />
                            <div className="mb-2"></div>
                            <Select readOnly={houseLoading} label='Penghuni' required={true} value={occupant} onChange={e => setOccupant(e.target.value)} placeholder={house == '' ? `Pilih rumah terlebih dahulu` : `Pilih penghuni`} options={occupantData.map((item) => { return { value: item.id + '***' + item.nik, text: `${item.nik} - ${item.fullName}` } })} />
                            <div className="mb-2"></div>
                            <Input value={amount} onChange={e => setAmount(prev => { return Number(e.target.value) < 0 ? 0 : e.target.value })} required={true} label='Jumlah (Rp)' type='number' />
                            <div className="mb-2"></div>
                            <Select label='Tipe Iuran' required={true} value={type} onChange={e => setType(e.target.value)} placeholder='Pilih jenis iuran' options={paymentType} />
                            <div className="mb-2"></div>
                            {type == 'other' ? <Input required={true} value={other} onChange={e => setOther(e.target.value)} label={'Tuliskan tipe pembayaran'} /> : null}
                        </div>
                    </div>
                    <div className="flex flex-col bg-white shadow-md p-2 m-2 lg:w-1/2 h-fit">
                        <CardHeader>
                            <h1 className='font-bold mb-2'>Periode Pembayaran</h1>
                        </CardHeader>
                        <div className="p-2">
                            <div className="flex flex-row flex-wrap justify-center w-full">
                                {periodSelect.map((period, index) => (
                                    <div key={index} onClick={() => addMonth(period.value - 1)} className="text-yellow-500 text-center grow p-2 m-1 border hover:text-white transition-colors border-yellow-500 bg-white hover:bg-yellow-500 rounded-md cursor-pointer">
                                        {period.text}
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mb-2">
                                <MonthPeriodPicker className='grow pr-1' label={'Start'} value={startPeriod} onChange={e => setStartPeriod(e.target.value)} />
                                <MonthPeriodPicker className='grow pl-1' label={'End'} value={endPeriod} onChange={e => setEndPeriod(e.target.value)} />
                            </div>
                            <Button
                                className={'button-primary'}
                                icon={<FaSave />}
                                label='Simpan'
                                loadingReplaceIcon={true}
                                isLoading={loading || houseLoading || occupantLoading}
                                isActive={!(loading && houseLoading && occupantLoading)} />
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default CreatePaymentPage