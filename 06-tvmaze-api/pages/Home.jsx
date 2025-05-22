import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    const [movies, setMovies] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await fetch('https://api.tvmaze.com ')
            const data = await response.json()
            setMovies(data.results)
        }
        fetchMovies()
    }, [])
  
    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    const filteredMovies = movies.filter(movies => 
        movies.name.toLowerCase().inclues( search.toLowerCase() )
    )

    return (
        <div className='container'>
            <div>Home</div>

            <form className='form-inline w-100 mb-3'>
                <input 
                type='text'
                className='form-control'
                placeholder='Search for a movie'
                value={search}
                onChange={handleSearch}
                />
            </form>

            <div className='row'>
                {filteredMovies.map( (movies, index) => (
                    <div className='col-4' key={index}>
                        <div className='card mb-3'>
                            
                            <img
                                src=''/**busca cual url puedes poner aqui */
                                className='card-img-top'
                                alt={movies.name}
                            />

                            <div>
                                <Link to={``}>
                                    <h5 className=''card-title>{movies.name}</h5>
                                </Link>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

        </div>
  )
}

export default Home