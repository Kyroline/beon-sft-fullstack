import { FaPencil, FaPlus } from "react-icons/fa6"
import Button from "../components/form/Button"
import InputText from "../components/form/InputText"
import OccupantHistory from "../components/OccupantHistory"
import { useState } from "react"
import CardHeader from "../components/CardHeader"
import { FaSave } from "react-icons/fa"
import { BsXLg } from "react-icons/bs"
import axiosInstance from "../lib/axiosInstance"
import { useNavigate } from "react-router-dom"
import { useRef } from "react"
import ImageUpload from '../components/form/ImageUpload'
import useModal from "../hooks/useModal"
import NoticeModal from "../components/modals/NoticeModal"
import ErrorModal from "../components/modals/ErrorModal"


const AddHousePage = () => {
    const [code, setCode] = useState('')
    const [address, setAddress] = useState('')
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const { showModal } = useModal()
    const navigate = useNavigate()

    const submit = async e => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axiosInstance.post('/api/v1/houses', {
                code: code, address: address, image: image, occupied: false
            })
            navigate('/data-rumah')
            showModal('Informasi', <NoticeModal text='Berhasil menambahkan rumah baru' />)
        } catch (error) {
            showModal('Error', <ErrorModal text='Terjadi kesalahan dalam membuat rumah baru. Tolong periksa kembali bahwa kode rumah tidak boleh kembar.' />)
        }
        setLoading(false)
    }
    return (
        <>
            <div className='flex flex-wrap'>
                <div className="bg-white shadow-md p-2 grow flex flex-col m-2">
                    <form onSubmit={submit}>
                        <CardHeader>
                            <div className="w-full flex flex-row justify-between items-center">
                                <h1 className='font-bold mb-2'>Tambah Rumah</h1>
                            </div>
                        </CardHeader>
                        <div className="m-2">
                            <ImageUpload image={image ? 'tmp/' + image : null} onUploadEnd={e => setLoading(false)} onUploadStart={e => setLoading(true)} onUploadSuccess={e => setImage(e)} />
                            <InputText label='Kode Rumah' required={true} value={code} onChange={e => setCode(e.target.value)} readOnly={loading} />
                            <p className="italic text-xs mb-2">Digunakan untuk pengenal unik yang berbeda satu sama lainnya</p>
                            <InputText label='Alamat' required={true} value={address} onChange={e => setAddress(e.target.value)} readOnly={loading} />
                        </div>
                        <div className="flex flex-row mb-1">
                            <Button
                                isLoading={loading}
                                loadingReplaceIcon={true}
                                icon={<FaSave />}
                                className='button-primary'
                                label='Simpan' />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddHousePage