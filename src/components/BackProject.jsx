import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { backProject } from '../services/blockchain'
import { useGlobalState, setGlobalState } from '../store'

const BackProject = ({ project }) => {
    const [backModal] = useGlobalState('backModal')
    const [amount, setAmount] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!amount) return

        await backProject(project?.id, amount)
        toast.success('Project backed successfully, will reflect in 30sec.')
        setGlobalState('backModal', 'scale-0')
    }

    return (
        <div
            className={`fixed top-0 left-0 w-screen h-screen flex
    items-center justify-center bg-black bg-opacity-50
    transform transition-transform duration-300 ${backModal}`}
        >
            <div
                className="bg-slate-100 shadow-xl shadow-black
        rounded-md w-11/12 md:w-2/5 h-7/12 p-6"
            >
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <div className="flex justify-between items-center">
                        <p className="font-bold uppercase text-2xl border-b-2 border-gray-400">{project?.title}</p>
                        <button
                            onClick={() => setGlobalState('backModal', 'scale-0')}
                            type="button"
                            className="border-0 bg-transparent focus:outline-none bg-red-400 p-1 rounded-md"
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
                    <div className='flex flex-col items-center'>

                        <div
                            className="flex flex-col justify-between items-center
                              bg-gray-200 rounded-md mt-4 w-full"
                        >
                            <input
                                className="block w-full bg-white shadow
            border-0 text-sm text-slate-500 focus:outline-none
            focus:ring-0"
                                type="number"
                                step={0.01}
                                min={0.01}
                                name="amount"
                                placeholder="Amount (ETH)"
                                onChange={(e) => setAmount(e.target.value)}
                                value={amount}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="inline-block px-6 py-2.5 bg-green-600
            text-white font-medium text-md leading-tight
            rounded-md w-40 shadow-md hover:bg-green-700 mt-5"
                        >
                            Back Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default BackProject