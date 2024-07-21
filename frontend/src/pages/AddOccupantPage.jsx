import { useRef, useState } from 'react'
import CardHeader from '../components/CardHeader'
import InputText from '../components/form/InputText'
import Button from '../components/form/Button'
import { FaSave } from 'react-icons/fa'
import DropUpload from '../components/form/DropUpload'
import RadioButtons from '../components/form/RadioButtons'
import axios from 'axios'
import useSWR from 'swr'
import Select from '../components/form/Select'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../lib/axiosInstance'
import useModal from '../hooks/useModal'
import ErrorModal from '../components/modals/ErrorModal'

const occupacyButton = [
    {
        value: 'Tetap',
        text: 'Tetap'
    },
    {
        value: 'Kontrak',
        text: 'Kontrak'
    },
    {
        value: 'Tidak Ada',
        text: 'Tidak Ada'
    }
]

const maritalButton = [
    {
        value: false,
        text: 'Belum Menikah'
    },
    {
        value: true,
        text: 'Sudah Menikah'
    }
]

const AddOccupantPage = () => {
    const { showModal } = useModal
    const [nik, setNik] = useState('')
    const [fullName, setFullName] = useState('')
    const [phone, setPhone] = useState('')
    const [ktp, setKtp] = useState(null)
    const [houseId, setHouseId] = useState(null)
    const [maritalStatus, setMaritalStatus] = useState(false)
    const [occupacyStatus, setOccupacyStatus] = useState('Pindah')
    const imageUpload = useRef()

    const { data: response, isLoading, error } = useSWR('/api/v1/houses', url => axiosInstance.get(url).then(res => res.data))

    const houses = response ? response.data.map((item, index) => ({
        value: item.id,
        text: item.code + '-' + item.address
    })) : []

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const submit = (e) => {
        e.preventDefault()
        if (loading)
            return

        setLoading(true)
        const submitForm = async () => {
            try {
                await axiosInstance.post('/api/v1/occupants', {
                    nik: nik,
                    fullName: fullName,
                    phone: phone,
                    houseId: houseId,
                    ktp: ktp,
                    occupacyStatus: occupacyStatus,
                    maritalStatus: maritalStatus
                })
                navigate('/data-penghuni')
            } catch (error) {
                showModal('Error', <ErrorModal text='Terjadi kesalahan dalam menambahkan penghuni. Pastikan NIK tidak konflik' />)
            }
            setLoading(false)
        }
        submitForm()
    }

    return (
        <form onSubmit={submit}>
            <div className="flex flex-col lg:flex-row">
                <div className="h-fit bg-white shadow-md p-2 grow flex flex-col m-2 w-full lg:w-1/2">
                    <CardHeader>
                        <h1 className='font-bold mb-2'>Tambah Penghuni</h1>
                    </CardHeader>
                    <div className="p-2">
                        <InputText required={true} value={nik} onChange={e => setNik(e.target.value)} label='NIK' />
                        <div className="my-2"></div>
                        <InputText required={true} value={fullName} onChange={e => setFullName(e.target.value)} label='Nama Lengkap' />
                        <div className='my-2' />
                        <InputText required={true} value={phone} onChange={e => setPhone(e.target.value)} label='Nomor Telepon' />
                        <div className='my-2' />
                        <label className='font-semibold mb-1'>Foto KTP<span className="text-red-600">*</span> </label>
                        {ktp ?
                            <div className='rounded-2xl relative mb-2 aspect-video w-full'>
                                <div onClick={() => imageUpload.current.click()} className="flex justify-center items-center cursor-pointer absolute w-full h-full bg-white opacity-0 hover:opacity-50 inset-0">
                                    <img className="aspect-square w-40" src="/edit-image.png" alt="" />
                                </div>
                                <input className='hidden' type="file" ref={imageUpload} onChange={() => { }} accept="image/*" />
                                <img className='aspect-video object-cover rounded-2xl' src={'http://localhost:3000/tmp/' + ktp} alt="" />
                            </div>
                            :
                            <>
                                <DropUpload required={true} onError={e => { setLoading(false) }} onUploadSuccess={e => { setKtp(e); setLoading(false) }} onUploadStart={() => setLoading(true)} />
                                <div className="mb-2"></div>
                            </>
                        }
                        <Button
                            className={'button-primary'}
                            icon={<FaSave />}
                            label='Simpan'
                            loadingReplaceIcon={true}
                            isLoading={loading}
                            isActive={!loading} />
                    </div>
                </div>
                <div className="h-fit bg-white shadow-md p-2 grow flex flex-col m-2 w-full lg:w-1/2 ">
                    <CardHeader>
                        <h1 className='font-bold mb-2'>Status Penghuni</h1>
                    </CardHeader>
                    <div className="p-2 flex flex-col h-full">
                        <RadioButtons
                            required={true}
                            name='occopacystatus'
                            label='Status Hunian'
                            horizontal={true}
                            options={occupacyButton}
                            onSelect={e => setOccupacyStatus(e)}
                        />
                        {occupacyStatus == 'Tetap' || occupacyStatus == 'Kontrak' ?
                            <div>
                                <Select label='Rumah Hunian' value={houseId} onChange={e => setHouseId(e.target.value)} placeholder='Pilih rumah' required={true} options={houses} />
                                <p className='text-xs italic mb-2'>Data penghuni akan masuk ke histori penghuni rumah yang dipilih</p>
                            </div>
                            : ''}
                        <RadioButtons
                            required={true}
                            name='maritalstatus'
                            label='Status Pernikahan'
                            horizontal={true}
                            options={maritalButton}
                            onSelect={e => setMaritalStatus(e)}
                        />
                    </div>
                </div>
            </div>
        </form>
    )
}

export default AddOccupantPage