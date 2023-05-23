import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { updateProject } from '../services/blockchain'
import { useGlobalState, setGlobalState } from '../store'

const UpdateProject = ({ project }) => {
    const [updateModal] = useGlobalState('updateModal')
    const [title, setTitle] = useState(project?.title)
    const [description, setDescription] = useState(project?.description)
    const [date, setDate] = useState(project?.date)
    const [imageURL, setImageURL] = useState(project?.imageURL)

    const toTimestamp = (dateStr) => {
        const dateObj = Date.parse(dateStr)
        return dateObj / 1000
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!title || !description || !date || !imageURL) return

        const params = {
            id: project?.id,
            title,
            description,
            expiresAt: toTimestamp(date),
            imageURL,
        }

        await updateProject(params)
        toast.success('Project updated successffully, will reflect in 30sec.')
        onClose()
    }

    const onClose = () => {
        setGlobalState('updateModal', 'scale-0')
    }

    return (
        <div
            className={`fixed top-0 left-0 w-screen h-screen flex
    items-center justify-center bg-black bg-opacity-50
    transform transition-transform duration-200 ${updateModal}`}
        >
            <div
                className="bg-slate-100 shadow-xl shadow-black
        rounded-md w-11/12 md:w-2/5 h-7/12 p-6"
            >
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <div className="flex justify-between items-center">
                        <p className="font-bold text-2xl">Edit Project</p>
                        <button
                            onClick={onClose}
                            type="button"
                            className="border-0 bg-red-400 rounded-md p-1 focus:outline-none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>

                        </button>
                    </div>

                    <div className="flex justify-center items-center mt-5">
                        <div className="rounded-xl overflow-hidden h-20 w-20">
                            <img
                                src={
                                    imageURL ||
                                    'https://media.wired.com/photos/5926e64caf95806129f50fde/master/pass/AnkiHP.jpg'
                                }
                                alt="project title"
                                className="h-full w-full object-cover cursor-pointer"
                            />
                        </div>
                    </div>


                    <div
                        className="flex justify-between items-center
          bg-gray-300 rounded-xl mt-5"
                    >
                        <input
                            className="block w-full bg-white shadow rounded-md text-black
            border-0 text-md  focus:outline-none
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
                            className="block w-full bg-white shadow rounded-md text-black
                            border-0 text-md  focus:outline-none
                            focus:ring-0"
                            type="date"
                            name="date"
                            placeholder="Expires"
                            onChange={(e) => setDate(e.target.value)}
                            value={date}
                            required
                        />
                    </div>

                    <div
                        className="flex justify-between items-center
          bg-gray-300 rounded-xl mt-5"
                    >
                        <input
                            className="block w-full bg-white shadow rounded-md text-black
                            border-0 text-md  focus:outline-none
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
                            className="block w-full bg-white shadow rounded-md text-black
                            border-0 text-md  focus:outline-none
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
                        className="block px-6 py-2.5 bg-green-600 w-40
            text-white font-medium text-md  mx-auto
            rounded-md shadow-md hover:bg-green-700 mt-5"
                    >
                        Update Project
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UpdateProject