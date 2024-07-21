import { FaPencil, FaPlus } from "react-icons/fa6"
import Button from "../components/form/Button"
import InputText from "../components/form/InputText"
import OccupantHistory from "../components/OccupantHistory"
import { useEffect, useState } from "react"
import CardHeader from "../components/CardHeader"
import { FaSave } from "react-icons/fa"
import { BsXLg } from "react-icons/bs"
import { useNavigate, useParams } from "react-router-dom"
import dateFormat from '../lib/dateFormat'
import PaymentTable from "../components/PaymentTable"
import useModal from "../hooks/useModal"
import ConfirmEvictionModal from "../components/modals/ConfirmEvictionModal"
import axiosInstance from "../lib/axiosInstance"
import ImageUpload from "../components/form/ImageUpload"
import useSWR from "swr"
import NoticeModal from "../components/modals/NoticeModal"

const timelineData = [
    {
        type: 1,
        name: 'Rizky Wahyu Dewantoro',
        date: '26 Mei 2023'
    },
    {
        type: 0,
        name: 'Rizky Wahyu Dewantoro',
        date: '01 Agustus 2023'
    },
    {
        type: 1,
        name: 'Rizky Wahyu Dewantoro',
        date: '31 Agustus 2023'
    }
]

const HouseInfoPage = () => {
    const { id } = useParams()
    const [hId, setHId] = useState(null)
    const { showModal } = useModal()
    const [toggleEdit, setToggleEdit] = useState(false)

    const [code, setCode] = useState('')
    const [address, setAddress] = useState('')
    const [image, setImage] = useState(null)
    const [occupant, setOccupant] = useState([])
    const [occupied, setOccupied] = useState(false)
    const [ori, setOri] = useState(null)

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const { data, isLoading, error, mutate } = useSWR('/api/v1/houses/' + id + '/occupant-histories', url => axiosInstance.get(url).then(res => res.data))

    const { data: paymentResponse, isLoading: paymentLoading, error: paymentError } = useSWR(hId ? '/api/v1/payments?house=' + hId : null, url => axiosInstance.get(url).then(res => res.data))
    console.log(paymentResponse ? paymentResponse.data : '')
    const histories = data ? data.data.map(
        (item) => {
            return {
                type: item.type,
                name: item.occupant.fullName,
                date: dateFormat(item.createdAt)
            }
        }
    ) : []

    const getData = async () => {
        const data = (await axiosInstance.get('/api/v1/houses/' + id)).data.data
        setHId(data.id)
        setCode(data.code)
        setAddress(data.address)
        setOri(data.image)
        setOccupant(data.occupant)
        setOccupied(data.occupied)
    }

    useEffect(() => {
        getData()
    }, [])

    const updateForm = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await axiosInstance.put(`/api/v1/houses/${id}`, { code: code, address: address, image: image })
            setToggleEdit(false)
            showModal('Informasi', <NoticeModal text='Info rumah berhasil diupdate!' />)
        } catch (error) {

        }
        setLoading(false)
    }

    return (
        <>
            <form onSubmit={updateForm}>
                <div className='flex flex-wrap '>
                    <div className="bg-white shadow-md p-2 grow flex flex-col m-2 md:w-2/5">
                        <CardHeader>
                            <div className="w-full flex flex-row justify-between items-center">
                                <h1 className='font-bold mb-2'>Info Rumah</h1>
                                {toggleEdit ?
                                    null
                                    :
                                    <div onClick={e => setToggleEdit(true)} className="w-6 h-6 p-1 mb-1 rounded-full flex justify-center items-center hover:bg-gray-500 cursor-pointer">
                                        <FaPencil size='12' />
                                    </div>

                                }

                            </div>
                        </CardHeader>
                        <div className="m-2">
                            <div className='rounded-2xl relative mb-2 aspect-video w-full'>
                                {toggleEdit ?
                                    <ImageUpload image={image ? 'tmp/' + image : ori ? ori : '/blank-house.jpg'} onUploadEnd={e => setLoading(false)} onUploadStart={e => setLoading(true)} onUploadSuccess={e => setImage(e)} />
                                    :
                                    <img className="w-full aspect-video object-cover rounded-2xl" src={ori ? import.meta.env.VITE_API_ENDPOINT + '/' + ori : '/blank-house.jpg'} alt="" />
                                }
                            </div>
                            <InputText label='Kode Rumah' value={code} onChange={e => setCode(e.target.value)} required={true} readOnly={!toggleEdit} />
                            <p className="italic text-xs mb-2">Digunakan untuk pengenal unik yang berbeda satu sama lainnya</p>
                            <InputText label='Alamat' value={address} onChange={e => setAddress(e.target.value)} required={true} readOnly={!toggleEdit} />
                            <div className='flex flex-col my-2'>
                                <label className='font-semibold mb-1'>Status Rumah</label>
                                <h1 className={`font-[Montserrat] p-2 rounded-md ${occupied ? 'text-green-600' : 'text-red-600'} font-bold`}>{occupied ? 'DIHUNI' : 'TIDAK DIHUNI'}</h1>
                            </div>
                            {occupied ?
                                <div className='flex flex-col mb-2'>
                                    <label className='font-semibold mb-1'>Jumlah Penghuni</label>
                                    <h1 className={`font-[Montserrat] p-2 rounded-md font-bold`}>{occupant.length} Orang</h1>
                                </div>
                                : ''
                            }
                        </div>
                        {toggleEdit ?
                            <div className="flex flex-row mb-1">
                                <Button
                                    icon={<BsXLg />}
                                    className='button-danger mr-1'
                                    label='Batalkan'
                                    onClick={e => { setToggleEdit(false); getData() }} />
                                <Button
                                    isLoading={false}
                                    loadingReplaceIcon={true}
                                    icon={<FaSave />}
                                    className='button-primary'
                                    label='Simpan' />
                            </div>
                            : null}
                    </div>
                    <div className="bg-white shadow-md p-2 w-1/2 grow m-2">
                        <CardHeader>
                            <div className="w-full flex flex-row justify-between items-center">
                                <h1 className='font-bold mb-2'>Penghuni</h1>
                                <Button onClick={e => navigate('/tambah-penghuni')} className={'button-primary mb-2'} icon={<FaPlus />} label={'Tambah Penghuni'} />
                            </div>
                        </CardHeader>
                        <div className="flex flex-col">
                            <div className="m-2">
                                <table className="text-xs text-left text-black w-full">
                                    <thead className="text-xs text-white uppercase bg-gray-700">
                                        <th scope="col" className="px-4 py-3">Nama</th>
                                        <th scope="col" className="px-4 py-3">Status</th>
                                        <th scope="col" className="px-4 py-3"></th>
                                    </thead>
                                    <tbody>
                                        {occupant.map((item, index) => (
                                            <tr className="bg-white border-b">
                                                <td className="px-4 py-3">{item.fullName}</td>
                                                <td className={`px-4 py-3 ${item.occupacyStatus == 'Tetap' ? 'text-green-600' : item.occupacyStatus == 'Kontrak' ? 'text-orange-600' : 'text-red-600'} font-bold`}>{item.occupacyStatus}</td>
                                                <td className="px-4 py-3">
                                                    <div className="flex flex-row mb-1">
                                                        <Button
                                                            onClick={() => showModal('Konfirmasi Penghapusan', <ConfirmEvictionModal key={new Date()} mep={item.fullName} house={id} occupant={item.nik} />)}
                                                            icon={<BsXLg />}
                                                            className='button-danger mr-1' />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="m-2">
                                <h1 className="font-bold">Histori</h1>
                                <OccupantHistory historyData={histories} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white shadow-md p-2 grow m-2">
                        <CardHeader>
                            <h1 className='font-bold mb-2'>Pembayaran</h1>
                        </CardHeader>
                        <div className="m-2">
                            <PaymentTable data={paymentResponse ? paymentResponse.data : []} />
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default HouseInfoPage