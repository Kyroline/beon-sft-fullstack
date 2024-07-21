import { useNavigate } from "react-router-dom"
import Button from "./form/Button"
import { FaEye } from "react-icons/fa6"
import moneyFormat from "../lib/moneyFormat"
import datetimeFormat from "../lib/datetimeFormat"
import useModal from "../hooks/useModal"
import ConfirmDeletionModal from "./modals/ConfirmDeletionModal"
import { BsXLg } from "react-icons/bs"

const PaymentTable = ({ data, mutate }) => {
    const navigate = useNavigate()
    const { showModal } = useModal()

    const tipe = (input) => {
        switch (input) {
            case 'satpam':
                return 'Iuran Satpam'

            case 'kebersihan':
                return 'Iuran Kebersihan'
            default:
                return input
        }
    }


    return (
        <div className="w-full h-full overflow-x-auto">
            <table className="text-xs text-left text-black w-full">
                <thead className="text-xs text-white uppercase bg-gray-700">
                    <tr>
                        <th scope="col" className="px-4 py-3">Kode Rumah</th>
                        <th scope="col" className="px-4 py-3">Nama Penghuni</th>
                        <th scope="col" className="px-4 py-3">Tipe</th>
                        <th scope="col" className="px-4 py-3">Bulan</th>
                        <th scope="col" className="px-4 py-3">Jumlah (Rp)</th>
                        <th scope="col" className="px-4 py-3">Tanggal</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        const tanggalAwal = new Date(item.startDate)
                        const tanggalAkhir = new Date(item.endDate)

                        const periode = tanggalAwal.getMonth() == tanggalAkhir.getMonth() ? tanggalAwal.toLocaleString('default', { month: 'long' }) + ' ' + tanggalAwal.getFullYear() : tanggalAwal.toLocaleString('default', { month: 'long' }) + ' ' + tanggalAwal.getFullYear() + ' - ' + tanggalAkhir.toLocaleString('default', { month: 'long' }) + ' ' + tanggalAkhir.getFullYear()
                        return (
                            <tr key={index} className="bg-white border-b">
                                <td className="px-4 py-3">{item.house.code}</td>
                                <td className="px-4 py-3">{item.occupant.fullName}</td>
                                <td className="px-4 py-3">{tipe(item.type)}</td>
                                <td className={`px-4 py-3`}>{periode}</td>
                                <td className="px-4 py-3">{moneyFormat.format(item.amount)}</td>
                                <td className="px-4 py-3">{datetimeFormat(item.createdAt)}</td>
                                <td className="px-4 py-3">
                                    <Button
                                        onClick={() => showModal('Perhatian', <ConfirmDeletionModal onCreate={() => {mutate()}} url={'/api/v1/payments/' + item.id} />)}
                                        isLoading={false}
                                        loadingReplaceIcon={true}
                                        icon={<BsXLg />}
                                        className='button-danger' />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default PaymentTable