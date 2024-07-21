import Select from '../components/form/Select'
import InputText from '../components/form/InputText'
import { useState } from 'react'

const TableFilter = ({ fields, enableSearch, onOrderSelect, onDirectionSelect, onSearchEnter }) => {
    const [search, setSearch] = useState('')
    const handleSearch = e => {
        e.preventDefault()
        console.log(search)
        onSearchEnter(search)
    }
    return (
        <div className="flex flex-row flex-wrap justify-between">
            <Select className='mr-1 mb-2' label={'Urutkan Berdasarkan'} options={fields} onChange={e => onOrderSelect(e.target.value)} />
            <Select className='ml-1 mb-2' label={'Urutkan'} options={[{ value: 'desc', text: 'Turun' }, { value: 'asc', text: 'Naik' }]} onChange={e => onDirectionSelect(e.target.value)} />
            <form className='grow ml-0 sm:ml-2' onSubmit={handleSearch}>
                <InputText value={search} onChange={e => setSearch(e.target.value)} className='grow h-full mb-2' label={'Cari'} />
            </form>
        </div>
    )
}

export default TableFilter