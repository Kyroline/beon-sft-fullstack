import { useNavigate } from "react-router-dom"
import Button from "./form/Button"
import { FaEye } from "react-icons/fa6"
const HouseTable = ({ data }) => {
    const navigate = useNavigate()
    return (
        <div className="w-full h-full overflow-x-auto">
            <table className="text-xs text-left text-black w-full">
                <thead className="text-xs text-white uppercase bg-gray-700">
                    <tr>
                        <th scope="col" className="px-4 py-3">Kode Rumah</th>
                        <th scope="col" className="px-4 py-3">Alamat</th>
                        <th scope="col" className="px-4 py-3">Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className="bg-white border-b">
                            <td className="px-4 py-3">{item.code}</td>
                            <td className="px-4 py-3">{item.address}</td>
                            <td className={`px-4 py-3 ${item.occupied ? 'text-green-600' : 'text-red-600'} font-bold`}>{item.occupied ? 'Dihuni' : 'Tidak dihuni'}</td>
                            <td className="px-4 py-3">
                                <Button
                                    onClick={() => navigate('/data-rumah/' + item.code)}
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

export default HouseTable