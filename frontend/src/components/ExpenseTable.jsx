import { useNavigate } from "react-router-dom"
import moneyFormat from "../lib/moneyFormat"
import dateFormat from "../lib/dateFormat"

const ExpenseTable = ({ data, mutate }) => {
    const navigate = useNavigate()

    const tipe = (input) => {
        switch (input) {
            case 'satpam':
                return 'Pengeluaran Satpam'

            case 'kebersihan':
                return 'Pengeluaran Kebersihan'
            default:
                return input
        }
    }

    return (
        <div className="w-full h-full overflow-x-auto">
            <table className="text-xs text-left text-black w-full">
                <thead className="text-xs text-white uppercase bg-gray-700">
                    <tr>
                        <th scope="col" className="px-4 py-3">Tipe Pengeluaran</th>
                        <th scope="col" className="px-4 py-3">Tanggal</th>
                        <th scope="col" className="px-4 py-3">Jumlah (Rp)</th>
                        <th scope="col" className="px-4 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className="bg-white border-b">
                            <td className="px-4 py-3">{tipe(item.type)}</td>
                            <td className="px-4 py-3">{dateFormat(item.date)}</td>
                            <td className="px-4 py-3">{moneyFormat.format(item.amount)}</td>
                            <td className="px-4 py-3">
                                <Button
                                    onClick={() => showModal('Perhatian', <ConfirmDeletionModal onCreate={() => { mutate() }} url={'/api/v1/expenses/' + item.id} />)}
                                    isLoading={false}
                                    loadingReplaceIcon={true}
                                    icon={<BsXLg />}
                                    className='button-danger' />
                            </td>
                        </tr>
                    )
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default ExpenseTable