import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHouseUser, FaMoneyBill, FaSearch } from 'react-icons/fa'
import { FaHandHoldingDollar, FaUserGroup } from 'react-icons/fa6'
import { BsFilterLeft, BsFilterRight, BsGraphUpArrow, BsXLg } from 'react-icons/bs'

const NavBarItem = [
    {
        title: 'Data Rumah',
        path: '/data-rumah',
        icon: <FaHouseUser />
    },
    {
        title: 'Data Penghuni',
        path: '/data-penghuni',
        icon: <FaUserGroup />
    },
    {
        title: 'Data Pembayaran',
        path: '/data-pembayaran',
        icon: <FaMoneyBill />,
    },
    {
        title: 'Data Pengeluaran',
        path: '/data-pengeluaran',
        icon: <FaHandHoldingDollar />,
    },
    {
        title: 'Laporan Keuangan',
        path: '/laporan-keuangan',
        icon: <BsGraphUpArrow />,
    }
]

const AdminNavbar = ({ toggle, onToggleNav }) => {
    const [active, setActive] = useState('')
    const [activeChild, setActiveChild] = useState('')
    const [navToShow, setNavToShow] = useState(NavBarItem)
    const [search, setSearch] = useState('')
    const [searchActive, setSearchActive] = useState(false)

    const toggleActive = (item) => {
        if (active == item) {
            setActive('')
        } else {
            setActive(item)
        }
    }

    const doSearch = () => {
        if (search == '')
            return
        setNavToShow(searchQuery(search, NavBarItem))
        setSearchActive(true)
    }

    const handleSearch = (e) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            doSearch()
        }
    }

    const searchQuery = (query, array) => {
        var searchQuery = query.toLowerCase().split(' ')
        let result = []
        const search = (elements, keyword) => {
            elements.forEach(element => {
                if (element.children == null && element.title.toLowerCase().indexOf(keyword) > -1) {
                    result.push(element)
                } else if (element.children != null) {
                    search(element.children, keyword)
                }
            })
        }
        search(array, searchQuery)
        return result
    }

    const resetSearch = () => {
        setNavToShow(NavBarItem)
        setSearch('')
        setSearchActive(false)
    }

    const toggleActiveChild = (item) => {
        if (activeChild == item) {
            setActiveChild('')
        } else {
            setActiveChild(item)
        }
    }

    const RenderNavChildren = (items) => {
        return (
            <>
                {items.map((item, index) => {
                    return (
                        item.children ?
                            <div key={index}>
                                <div className="cursor-pointer p-2.5 px-4 flex hover:bg-gray-700 rounded-md mt-1 transition" onClick={() => { toggleActiveChild(item.title) }}>
                                    <i className={`bi ${item.icon}`}></i>
                                    <div className="flex justify-between w-full items-center">
                                        <span className="text-sm font-light ml-4 text-gray-200">{item.title}</span>
                                        <span className={`transition-transform duration-300 text-sm font-light ${activeChild == item.title ? 'rotate-0' : 'rotate-180'}`} id="arrow">
                                            <i className="bi bi-chevron-down"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className={`text-left items-right text-sm font-light mb-2 pl-5 mx-auto text-gray-200 duration-300 transition-all ${(activeChild == item.title) ? 'max-h-[1000px]' : 'max-h-0 '} origin-top overflow-hidden`}>
                                    {RenderNavChildren(item.children)}
                                </div>
                            </div> :
                            <div key={index} >
                                <Link to={item.path}>
                                    <div className="cursor-pointer p-2.5 px-4 flex hover:bg-gray-700 rounded-md mt-1" onClick={() => { }}>
                                        <i className={`bi ${item.icon}`}></i>
                                        <div className="flex justify-between w-full items-center">
                                            <span className="text-sm font-light ml-4 text-gray-200">{item.title}</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                    )
                })}
            </>
        )
    }

    return (
        <>
            <span className='absolute top-0 left-0 w-[100vw] h-[76px] bg-gray-900 z-20 flex flex-row'>
                <span className='h-full text-white text-4xl py-5 px-4 cursor-pointer bg-gray-900 hover:bg-gray-800 z-30 mr-2' onClick={onToggleNav}>
                    <BsFilterLeft />
                </span>
                <div className="flex items-center min-w-96 sm:max-w-[500px]">
                    <h1 className="font-bold text-gray-200 text-sm">SiRuwet | Sistem Informasi Rumah Warga ErTe</h1>
                </div>
                <div className="flex items-center justify-end w-full">
                    <div className=" py-5 px-5 cursor-pointer bg-gray-900 hover:bg-gray-800">
                        <i className='bi bi-person-circle text-gray-200 text-2xl'></i>
                    </div>
                </div>
            </span>
            <div className={`no-scrollbar sidebar fixed top-[75px] bottom-0 lg:left-0 p-2 w-[250px] transition-all ${toggle ? 'translate-x-0' : 'translate-x-[-250px]'} overflow-y-auto text-center bg-gray-900 z-20`}>
                <div className="flex items-center rounded-md py-0.5 px-1.5 duration-300 cursor-pointer bg-gray-700 text-white">
                    {/* <i className="bi bi-search text-sm font-light bg-gray-700 hover:bg-gray-900 p-1 px-2 rounded" onClick={doSearch}></i> */}
                    <FaSearch className="text-sm font-light bg-gray-700 hover:bg-gray-900 m-1 mx-2 rounded z-10" onClick={doSearch} />
                    <input type="text" className="text-sm font-light ml-2 w-full bg-transparent focus:outline-none py-2.5 " value={search} onChange={e => setSearch(e.target.value)} onKeyDown={handleSearch} />
                    {searchActive ? <BsXLg className='bi bi-x-lg absolute right-5' onClick={resetSearch} /> : null}
                </div>
                {navToShow.map((item, index) => {
                    return (
                        <div key={index}>
                            {!item.children ?
                                <Link to={item.path}>
                                    <div className={`p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer ${(active == item.title) ? 'bg-blue-600' : 'hover:bg-blue-600'} text-white transition`} onClick={() => { toggleActive(item.title) }}>
                                        {item.icon}
                                        <div className="flex justify-between w-full items-center">
                                            <span className="text-sm font-light ml-4 text-gray-200">{item.title}</span>
                                            {item.children ?
                                                <span className={`transition-transform duration-300 text-sm font-light ${active == item.title ? 'rotate-0' : 'rotate-180'}`} id="arrow">
                                                    <i className="bi bi-chevron-down"></i>
                                                </span> : ''}
                                        </div>
                                    </div>
                                </Link>
                                :
                                <div className={`p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer ${(active == item.title) ? 'bg-blue-600' : 'hover:bg-blue-600'} text-white transition`} onClick={() => { toggleActive(item.title) }}>
                                    {item.icon}
                                    <div className="flex justify-between w-full items-center">
                                        <span className="text-sm font-light ml-4 text-gray-200">{item.title}</span>
                                        {item.children ?
                                            <span className={`transition-transform duration-300 text-sm font-light ${active == item.title ? 'rotate-0' : 'rotate-180'}`} id="arrow">
                                                <i className="bi bi-chevron-down"></i>
                                            </span> : ''}
                                    </div>
                                </div>}

                            <div className={`text-left items-right text-sm font-normal mt-2 pl-5 mx-auto text-gray-200 duration-300 transition-all origin-top overflow-hidden ${(active == item.title) ? `max-h-[1000px]` : 'max-h-0'}`}>
                                {item.children ? RenderNavChildren(item.children) : ''}
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default AdminNavbar 