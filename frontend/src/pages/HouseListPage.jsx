import HouseTable from "../components/HouseTable"
import CardHeader from "../components/CardHeader"
import Button from "../components/form/Button"
import { FaPlus } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"
import useSWR from "swr"
import TableFilter from "../components/TableFilter"
import axiosInstance from "../lib/axiosInstance"

const fields = [
    {
        value: 'code',
        text: 'Kode Rumah'
    },
    {
        value: 'occupied',
        text: 'Status Hunian'
    },
    {
        value: 'createdAt',
        text: 'Dibuat'
    }
]

const HouseListPage = () => {
    const navigate = useNavigate()
    const { data: response, isLoading, error } = useSWR('/api/v1/houses', url => axiosInstance.get(url).then(res => res.data))
    return (
        <div className="flex flex-col bg-white shadow-md p-2 m-2">
            <CardHeader>
                <div className="w-full flex flex-row justify-between items-center">
                    <h1 className='font-bold mb-2'>Data Rumah</h1>
                    <Button onClick={() => navigate('/tambah-rumah')} className={'button-primary mb-2'} icon={<FaPlus />} label={'Tambah Rumah'} />
                </div>
            </CardHeader>
            <div className="m-2">
                {/* <TableFilter fields={fields} /> */}
                {/* <div className="mb-2"></div> */}
                <HouseTable data={response ? response.data : []} />
            </div>
        </div>
    )
}

export default HouseListPage