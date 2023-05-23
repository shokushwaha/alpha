import { setGlobalState } from '../store'
import { BsPlusLg } from 'react-icons/bs'

const AddButton = () => {
    return (
        <div className="fixed right-10 bottom-10 flex  justify-center">
            <button
                type="button"
                className="flex justify-center items-center w-10 h-10 bg-green-600
        text-white 
        rounded-md shadow-md hover:bg-green-700 hover:scale-110"
                onClick={() => setGlobalState('createModal', 'scale-100')}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>

            </button>
        </div>
    )
}

export default AddButton