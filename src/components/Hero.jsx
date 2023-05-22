import { setGlobalState, useGlobalState } from '../store'
const Hero = () => {
    const [stats] = useGlobalState('stats')

    return (
        <div className="text-center bg-bgSecondary text-gray-800 py-24 px-6">
            <h1
                className="flex flex-col gap-4 items-center text-5xl md:text-6xl xl:text-7xl font-bold
      tracking-tight mb-12"
            >
                <span className="capitalize">Bring creative projects to life on</span>
                <span className=" flex items-center  uppercase text-green-500">alpha <svg xmlns="http://www.w3.org/2000/svg" fill="#22c55e" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                </span>
            </h1>
            <div className="flex flex-col gap-4 items-center space-x-2">
                <button
                    type="button"
                    className="flex items-center gap-2 px-6 py-2 bg-green-600
                   text-white font-medium text-xs  uppercase border-2 border-green-600
                   rounded-md shadow-xl hover:bg-white hover:text-green-600 hover:scale-105 "
                    onClick={() =>
                        setGlobalState('createModal', 'scale-100')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>

                    Add Project
                </button>

                <span className='border-2 px-4 py-1 bg-slate-200 rounded-md text-extrabold shadow'>Thanks for backing projects</span>
            </div>

            <div className="flex gap-4 justify-center items-center mt-10  ">
                <div
                    className="flex flex-col justify-center items-center
          h-20  shadow-md w-full border-b-2 border-gray-400"
                >
                    <span
                        className="text-lg font-bold text-green-900
            leading-5"
                    >
                        {stats?.totalProjects || 0}
                    </span>
                    <span>Projects</span>
                </div>
                <div
                    className="flex flex-col justify-center items-center
          h-20  shadow-md w-full border-b-2 border-gray-400"
                >
                    <span
                        className="text-lg font-bold text-green-900
            leading-5"
                    >
                        {stats?.totalBacking || 0}
                    </span>
                    <span>Backings</span>
                </div>
                <div
                    className="flex flex-col justify-center items-center
          h-20  shadow-md w-full border-b-2 border-gray-400"
                >
                    <span
                        className="text-lg font-bold text-green-900
            leading-5"
                    >
                        {stats?.totalDonations || 0} ETH
                    </span>
                    <span>Donated</span>
                </div>
            </div>
        </div>
    )
}

export default Hero