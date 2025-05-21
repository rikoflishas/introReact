import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    const [films, setFilms] = useState([])
    const [search, setSearch] = useState('')
  
    return (

    <div className='container'>
        <div>Home</div>

        <form className='form-inline w-100 mb-3'>
            <input 
            type='text'
            className='form-control'
            placeholder='Search for a film'
            value={search}
            onChange={handleSearch}
            />
        </form>

        <div className='row'>

        </div>

    </div>
  )
}

export default Home