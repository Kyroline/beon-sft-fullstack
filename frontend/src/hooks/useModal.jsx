import { useContext } from "react"
import { Modal } from "../contexts/ModalContext"

const useModal = () => {
    return useContext(Modal)
}

export default useModal