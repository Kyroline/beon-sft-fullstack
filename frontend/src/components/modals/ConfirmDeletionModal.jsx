import React, { useContext, useState } from 'react'
import useModal from '../../hooks/useModal'
import Button from '../form/Button'
import axiosInstance from '../../lib/axiosInstance'

const ConfirmDeletionModal = ({ onCreate, url }) => {
    const { hideModal } = useModal()
    const [ready, setReady] = useState(true)

    const onSave = async () => {
        if (!ready)
            return
        setReady(false)
        try {
            let response = await axiosInstance.delete(url)
            onCreate()
        } catch (error) {

        }
        hideModal()
        setReady(true)
    }
    return (
        <div className="flex flex-col w-full">
            <p>Apakah Anda yakin ingin menghapus data ini?</p>
            <p className='text-xs text-red-600 font-bold italic'>Data yang dihapus tidak bisa dikembalikan</p>
            <hr class="h-px bg-gray-200 border-0 " />
            <div className="flex flex-row w-full justify-end items-center mt-4">
                <Button onClick={() => hideModal()} label={'Batalkan'} className={'button-primary-outline mr-2'} />
                <Button onClick={onSave} label={'Hapus'} className={'button-primary'} />
            </div>
        </div>
    )
}

export default ConfirmDeletionModal