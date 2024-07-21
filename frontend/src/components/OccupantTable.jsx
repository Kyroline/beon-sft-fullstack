import { useNavigate } from "react-router-dom"
import Button from "./form/Button"
import { FaEye } from "react-icons/fa6"

const OccupantTable = ({ data }) => {
    const navigate = useNavigate()
    return (
        <div className="w-full h-full overflow-x-auto">
            <table className="text-xs text-left text-black w-full">
                <thead className="text-xs text-white uppercase bg-gray-700">
                    <tr>
                        <th scope="col" className="px-4 py-3">NIK</th>
                        <th scope="col" className="px-4 py-3">Nama</th>
                        <th scope="col" className="px-4 py-3">Status Penghuni</th>
                        <th scope="col" className="px-4 py-3">Kode Hunian</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className="bg-white border-b">
                            <td className="px-4 py-3">{item.nik}</td>
                            <td className="px-4 py-3">{item.fullName}</td>
                            <td className={`px-4 py-3 ${item.occupacyStatus == 'Tetap' ? 'text-green-600' : item.occupacyStatus == 'Kontrak' ? 'text-orange-600' : 'text-red-600'} font-bold`}>{item.occupacyStatus}</td>
                            <td className="px-4 py-3">{item.house ? item.house.code : '-'}</td>
                            <td className="px-4 py-3">
                                <Button
                                    onClick={() => navigate('/data-penghuni/' + item.nik)}
                                    isLoading={false}
                                    loadingReplaceIcon={true}
                                    icon={<FaEye />}
                                    className='button-primary' />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default OccupantTable