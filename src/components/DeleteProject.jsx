import { FaTimes } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deleteProject } from '../services/blockchain'
import { useGlobalState, setGlobalState } from '../store'

const DeleteProject = ({ project }) => {
    const [deleteModal] = useGlobalState('deleteModal')
    const navigate = useNavigate()

    const handleSubmit = async () => {
        await deleteProject(project?.id)
        toast.success('Project deleted successfully, will reflect in 30sec.')
        setGlobalState('deleteModal', 'scale-0')
        navigate.push('/')
    }

    return (
        <div
            className={`fixed top-0 left-0 w-screen h-screen flex
    items-center justify-center bg-black bg-opacity-50
    transform transition-transform duration-300 ${deleteModal}`}
        >
            <div
                className="bg-slate-100 shadow-xl shadow-black
        rounded-md w-11/12 md:w-2/5 h-7/12 p-6"
            >
                <div className="flex flex-col">
                    <div className="flex justify-between items-center">
                        <p className="font-bold text-2xl uppercase">{project?.title}</p>
                        <button
                            onClick={() => setGlobalState('deleteModal', 'scale-0')}
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
                            <img
                                src={
                                    project?.imageURL ||
                                    'https://media.wired.com/photos/5926e64caf95806129f50fde/master/pass/AnkiHP.jpg'
                                }
                                alt={project?.title}
                                className="h-full w-full object-cover cursor-pointer"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col justify-center items-center rounded-xl mt-5">
                        <p>Are you sure to delete this project?</p>
                        <p className="text-red-400 font-bold mt-2">This action can't be reversed</p>
                    </div>

                    <button
                        className=" px-6 py-2.5 bg-red-600
            text-white w-40 mx-auto 
            rounded-md shadow-md hover:bg-red-700 mt-5"
                        onClick={handleSubmit}
                    >
                        Delete Project
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteProject