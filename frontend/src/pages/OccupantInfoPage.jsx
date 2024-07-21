import { useEffect, useRef, useState } from 'react'
import CardHeader from '../components/CardHeader'
import InputText from '../components/form/InputText'
import Input from '../components/form/Input'
import Button from '../components/form/Button'
import { FaSave } from 'react-icons/fa'
import DropUpload from '../components/form/DropUpload'
import RadioButtons from '../components/form/RadioButtons'
import useSWR from 'swr'
import Select from '../components/form/Select'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../lib/axiosInstance'
import ImageUpload from '../components/form/ImageUpload'
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

const OccupantInfoPage = () => {
    const { id } = useParams()
    const [nik, setNik] = useState('')
    const [fullName, setFullName] = useState('')
    const [phone, setPhone] = useState('')
    const [ktp, setKtp] = useState(null)
    const [houseId, setHouseId] = useState(null)
    const [maritalStatus, setMaritalStatus] = useState(false)
    const [occupacyStatus, setOccupacyStatus] = useState('Pindah')
    const [ori, setOri] = useState(null)
    const {showModal} = useModal()

    const { data: response, isLoading, error } = useSWR('/api/v1/houses', url => axiosInstance.get(url).then(res => res.data))

    const fetchData = async () => {
        const data = (await axiosInstance.get('/api/v1/occupants/' + id)).data.data
        setOri(data.ktp)
        setNik(data.nik)
        setFullName(data.fullName)
        setPhone(data.phone)
        setHouseId(data.houseId)
        setMaritalStatus(data.maritalStatus)
        setOccupacyStatus(data.occupacyStatus)
    }

    useEffect(() => {
        fetchData()
    }, [])

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
                await axiosInstance.put('/api/v1/occupants/' + id, {
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
                showModal('Error', <ErrorModal text='Terjadi kesalahan dalam mengupdate penghuni. Pastikan NIK tidak konflik' />)
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
                        <Input type='number' required={true} value={phone} onChange={e => setPhone(e.target.value)} label='Nomor Telepon' />
                        <div className='my-2' />
                        <label className='font-semibold mb-1'>Foto KTP<span className="text-red-600">*</span> </label>
                        <ImageUpload image={ktp ? 'tmp/' + ktp : ori ? ori : '/blank-house.jpg'} onUploadEnd={e => setLoading(false)} onUploadStart={e => setLoading(true)} onUploadSuccess={e => setKtp(e)} />
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
                            value={occupacyStatus}
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
                            value={maritalStatus}
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

export default OccupantInfoPage