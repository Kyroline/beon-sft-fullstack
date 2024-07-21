const DataTable = ({ columns, data }) => {
    return (
        <table className="text-xs text-left text-black w-full">
            <thead className="text-xs text-white uppercase bg-gray-700">
                {columns.map((item, index) => (
                    <th key={index} scope="col" className="px-4 py-3">{item.title}</th>
                ))}
            </thead>
            <tbody>
                <tr className="bg-white border-b">
                    <td className="px-4 py-3">Rizky Wahyu Dewantoro</td>
                    <td className="px-4 py-3 text-green-600 font-bold">TETAP</td>
                    <td className="px-4 py-3">
                        <div className="flex flex-row mb-1">
                            <Button
                                icon={<BsXLg />}
                                className='button-danger mr-1' />
                            <Button
                                isLoading={false}
                                loadingReplaceIcon={true}
                                icon={<FaPencil />}
                                className='button-warning' />
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}