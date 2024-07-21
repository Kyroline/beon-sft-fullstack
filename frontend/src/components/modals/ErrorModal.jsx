import React, { useContext, useState } from 'react'
import useModal from '../../hooks/useModal'
import Button from '../form/Button'
import axiosInstance from '../../lib/axiosInstance'

const ErrorModal = ({ text }) => {
    const { hideModal } = useModal()

    return (
        <div className="flex flex-col w-full items-center justify-center">
            <img className='w-32' src="/exclamation.png" alt="" />
            <p>{text}</p>
            <hr class="h-px bg-gray-200 border-0 mt-4" />
            <div className="flex flex-row w-full mt-2 justify-center items-center">
                <Button onClick={() => hideModal()} label={'OK'} className={'button-primary'} />
            </div>
        </div>
    )
}

export default ErrorModal