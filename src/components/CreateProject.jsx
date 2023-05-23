import { useRef, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { createProject } from '../services/blockchain'
import { useGlobalState, setGlobalState } from '../store'
import axios from 'axios'
const CreateProject = () => {
    const [createModal] = useGlobalState('createModal')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [cost, setCost] = useState('')
    const [date, setDate] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [imgCopyUrl, setImgCopyUrl] = useState('')
    const toTimestamp = (dateStr) => {
        const dateObj = Date.parse(dateStr)
        return dateObj / 1000
    }
    const textRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!title || !description || !cost || !date || !imageURL) return

        const params = {
            title,
            description,
            cost,
            expiresAt: toTimestamp(date),
            imageURL,
        }

        await createProject(params)
        toast.success('Project created successfully, will reflect in sometime!')
        onClose()
    }







    const onClose = () => {
        setGlobalState('createModal', 'scale-0')
        reset()
    }

    const reset = () => {
        setTitle('')
        setCost('')
        setDescription('')
        setImageURL('')
        setDate('')
    }

    async function uploadImages(e) {
        const files = e.target.files;
        const formData = new FormData();

        for (const file of files) {
            formData.append("file", file);
            formData.append("upload_preset", "ecomnext")
        }


        const data = await axios
            .post("https://api.cloudinary.com/v1_1/dt21djrjq/image/upload",
                formData
            );
        console.log(data.data.secure_url);
        setImgCopyUrl(data.data.secure_url);
        setImageURL(data.data.secure_url)


    }


    return (
        <div
            className={`fixed top-0 left-0 w-screen h-screen flex
    items-center justify-center bg-black bg-opacity-50
    transform transition-transform duration-300 ${createModal}`}
        >
            <div
                className="bg-slate-100 shadow-xl shadow-black
        rounded-xl w-11/12 md:w-2/5 h-7/12 p-6"
            >
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <div className="flex justify-between items-center">
                        <p className="font-bold uppercase text-2xl">Add Project</p>
                        <button
                            onClick={onClose}
                            type="button"
                            className="border-0 bg-red-400 p-1 rounded-md focus:outline-none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>

                        </button>
                    </div>

                    <div className="flex justify-center items-center mt-5">
                        <div className="rounded-xl overflow-hidden h-20 w-20">
                            {
                                imageURL ?
                                    <img
                                        src={
                                            imageURL ||
                                            'https://media.wired.com/photos/5926e64caf95806129f50fde/master/pass/AnkiHP.jpg'
                                        }
                                        alt="project title"
                                        className="h-full w-full object-cover cursor-pointer"
                                    />
                                    : <span>No image to show!</span>}
                        </div>
                    </div>

                    <div
                        className="flex justify-between items-center
          bg-gray-300 rounded-xl mt-5"
                    >
                        <input
                            className=" w-full bg-white shadow
            border-0 text-sm  rounded-md focus:outline-none
            focus:ring-0"
                            type="text"
                            name="title"
                            placeholder="Title"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            required
                        />
                    </div>

                    <div
                        className="flex justify-between items-center
          bg-gray-300 rounded-xl mt-5"
                    >
                        <input
                            className="w-full bg-white shadow
                            border-0 text-sm  rounded-md focus:outline-none
                            focus:ring-0"
                            type="number"
                            step={0.01}
                            min={0.01}
                            name="cost"
                            placeholder="cost (ETH)"
                            onChange={(e) => setCost(e.target.value)}
                            value={cost}
                            required
                        />
                    </div>

                    <div
                        className="flex justify-between items-center
          bg-gray-300 rounded-xl mt-5"
                    >
                        <input
                            className="w-full bg-white shadow
                            border-0 text-sm  rounded-md focus:outline-none
                            focus:ring-0"
                            type="date"
                            name="date"
                            placeholder="Expires"
                            onChange={(e) => setDate(e.target.value)}
                            value={date}
                            required
                        />
                    </div>

                    <div className='flex gap-2 items-center mt-4 bg-white p-2'>
                        <label>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                            </svg>
                            <input type="file" onChange={uploadImages} className='hidden' />
                        </label>
                        Upload Image



                    </div>

                    <div
                        className="flex justify-between items-center
          bg-gray-300 rounded-xl mt-5"
                    >
                        <input
                            className="w-full bg-white shadow
                            border-0 text-sm  rounded-md focus:outline-none
                            focus:ring-0"
                            type="url"
                            name="imageURL"
                            placeholder="Image URL"
                            onChange={(e) => setImageURL(e.target.value)}
                            value={imageURL}
                            required
                        />
                    </div>

                    <div
                        className="flex justify-between items-center
          bg-gray-300 rounded-xl mt-5"
                    >
                        <textarea
                            className="w-full bg-white shadow
                            border-0 text-sm  rounded-md focus:outline-none
                            focus:ring-0"
                            type="text"
                            name="description"
                            placeholder="Description"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="mx-auto w-40 px-6 py-2.5 bg-green-600
            text-white font-medium text-md leading-tight
            rounded-md shadow-md hover:bg-green-700 mt-5"
                    >
                        Add Project
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateProject