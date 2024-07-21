import { useRef } from "react"
import axiosInstance from "../../lib/axiosInstance"

const ImageUpload = ({ image, onUploadSuccess, onUploadStart, onUploadEnd }) => {
    const imageUpload = useRef()

    const uploadImage = async (e) => {
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        try {
            onUploadStart()
            let response = await axiosInstance.post('/api/v1/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            onUploadSuccess(response.data.filename)
        } catch (error) {
        } finally {
            onUploadEnd()
        }
    }

    return (
        <div className='rounded-2xl relative mb-2 aspect-video w-full'>
            <div onClick={() => imageUpload.current.click()} className="flex justify-center items-center cursor-pointer absolute w-full h-full bg-white opacity-0 hover:opacity-50 inset-0">
                <img className="aspect-square w-40" src="/edit-image.png" alt="" />
            </div>
            <input className='hidden' type="file" ref={imageUpload} onChange={uploadImage} accept="image/*" />
            <img className='aspect-video object-cover rounded-2xl w-full' src={image ? 'http://localhost:3000/' + image : '/blank-house.jpg'} alt="" />
        </div>
    )
}

export default ImageUpload