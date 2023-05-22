import { TbBusinessplan } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { connectWallet } from '../services/blockchain'
import { truncate, useGlobalState } from '../store'

const Header = () => {
    const [connectedAccount] = useGlobalState('connectedAccount')

    return (
        <header
            className="flex justify-between items-center
        p-5 bg-slate-200 shadow-lg fixed top-0 left-0 right-0"
        >
            <Link
                to="/"
                className="flex justify-start items-center
      text-xl text-black space-x-1"
            >
                <span className='flex gap-2 text-4xl items-center uppercase'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                    </svg>
                    Alpha</span>

            </Link>

            <div className="flex space-x-2 justify-center">
                {connectedAccount ? (
                    <button
                        type="button"
                        className="flex items-center gap-2 px-6 py-2.5 bg-green-600
            text-white text-xs uppercase
             hover:bg-green-700 shadow-xl rounded-md"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
                        </svg>


                        {truncate(connectedAccount, 4, 4, 11)}
                    </button>
                ) : (
                    <button
                        type="button"
                        className="inline-block px-6 py-2.5 bg-green-600
            text-white font-medium text-xs leading-tight uppercase
            rounded-full shadow-md hover:bg-green-700"
                        onClick={connectWallet}
                    >
                        Connect Wallet
                    </button>
                )}
            </div>
        </header>
    )
}

export default Header