import useSWR from "swr"
import PaymentTable from "../components/PaymentTable"
import axios from "axios"
import CardHeader from "../components/CardHeader"
import Button from "../components/form/Button"
import { FaPlus } from "react-icons/fa6"
import TableFilter from "../components/TableFilter"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../lib/axiosInstance"

const fields = [{ value: 'code', text: 'codeRumah' }]

const PaymentListPage = () => {
    const navigate = useNavigate()
    const { data: response, isLoading, error, mutate } = useSWR('/api/v1/payments', url => axiosInstance.get(url).then(res => res.data))
    return (
        <div className="flex flex-col bg-white shadow-md p-2 m-2">
            <CardHeader>
                <div className="w-full flex flex-row justify-between items-center">
                    <h1 className='font-bold mb-2'>Data Pembayaran</h1>
                    <Button onClick={() => navigate('/buat-pembayaran')} className={'button-primary mb-2'} icon={<FaPlus />} label={'Buat Pembayaran'} />
                </div>
            </CardHeader>
            <div className="m-2">
                {/* <TableFilter fields={fields} />
                <div className="mb-2"></div> */}
                <PaymentTable data={response ? response.data : []} mutate={mutate} />
            </div>
        </div>
    )
}

export default PaymentListPage