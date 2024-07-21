import { Link } from "react-router-dom"

const OccupantHistory = ({ historyData }) => {

    return (

        <div className="w-full flex flex-col justify-center m-2">
            {historyData.map((item, index) => (
                <div key={index} className="relative">
                    <svg className='absolute pointer-events-none top-0 left-0 h-full text-black dark:text-white'>
                        <circle cx="10" cy="20" r="10" fill={'#1f1f1f'} />
                        {index + 1 != historyData.length ? <line x1="10" y1="38" x2="10" y2="100%" stroke={'#1f1f1f'} strokeLinecap='round' strokeWidth='2' /> : null}
                        
                    </svg>
                    <div className="flex flex-col ml-8 m-2 ">
                        <h1 className={`${item.type == 'Menempati' ? 'text-green-600' : 'text-red-600'} font-bold`}>{item.type}</h1>
                        <Link href={item.url} className="group mb-3">
                            <h2 className="group-hover:underline text-primary-600 dark:text-primary-700 font-semibold">{item.name}</h2>
                            <h4 className="text-xs">{item.date}</h4>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default OccupantHistory