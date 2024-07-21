import OccupantTable from "../components/OccupantTable"
import CardHeader from "../components/CardHeader"
import Button from "../components/form/Button"
import { FaPlus } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"
import useSWR from "swr"
import axiosInstance from "../lib/axiosInstance"

const OccupantListPage = () => {
    const navigate = useNavigate()
    const { data: response, isLoading, error } = useSWR('/api/v1/occupants', url => axiosInstance.get(url).then(res => res.data))
    return (
        <div className="flex flex-col bg-white shadow-md p-2 m-2">
            <CardHeader>
                <div className="w-full flex flex-row justify-between items-center">
                    <h1 className='font-bold mb-2'>Data Penghuni</h1>
                    <Button onClick={() => navigate('/tambah-penghuni')} className={'button-primary mb-2'} icon={<FaPlus />} label={'Tambah Penghuni'} />
                </div>
            </CardHeader>
            <div className="m-2">
                <OccupantTable data={response ? response.data : []} />
            </div>
        </div>
    )
}

export default OccupantListPage