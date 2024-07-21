import React, { useContext, useState } from 'react'
import useModal from '../../hooks/useModal'
import Button from '../form/Button'
import axiosInstance from '../../lib/axiosInstance'

const ConfirmEvictionModal = ({ onCreate, mep, house, occupant }) => {
    const { hideModal } = useModal()
    const [ready, setReady] = useState(true)

    const onSave = async () => {
        if (!ready)
            return
        setReady(false)
        try {
            let response = await axiosInstance.delete('/api/v1/houses/' + house + '/occupants/' + occupant)
            onCreate()
        } catch (error) {

        }
        hideModal()
        setReady(true)
    }
    return (
        <div className="flex flex-col w-full">
            <p>Apakah Anda yakin ingin menghapus {mep} dari rumah?</p>
            <p className='text-xs text-red-600 font-bold italic'>{mep} akan ditandai pindah dari rumah hunian ini.</p>
            <hr class="h-px bg-gray-200 border-0 " />
            <div className="flex flex-row w-full justify-end items-center mt-4">
                <Button onClick={() => hideModal()} label={'Batalkan'} className={'button-primary-outline mr-2'} />
                <Button onClick={onSave} label={'Hapus'} className={'button-primary'} />
            </div>
        </div>
    )
}

export default ConfirmEvictionModal