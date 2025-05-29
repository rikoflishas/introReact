import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    const [movies, setMovies] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                // Using the shows endpoint to get a list of shows
                const response = await fetch('https://api.tvmaze.com/shows')
                const data = await response.json()
                // TVMaze returns an array directly, not nested in 'results'
                setMovies(data.slice(0, 20)) // Limiting to first 20 shows for performance
            } catch (error) {
                console.error('Error fetching movies:', error)
            }
        }
        fetchMovies()
    }, [])
  
    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    const filteredMovies = movies.filter(movie => 
        movie.name.toLowerCase().includes(search.toLowerCase()) // Fixed typo: 'includes'
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
                {filteredMovies.map((movie, index) => (
                    <div className='col-4' key={movie.id || index}>
                        <div className='card mb-3'>
                            <img
                                src={movie.image?.medium || movie.image?.original || 'https://via.placeholder.com/210x295?text=No+Image'}
                                className='card-img-top'
                                alt={movie.name}
                                style={{ height: '300px', objectFit: 'cover' }}
                            />
                            <div className='card-body'>
                                <Link to={`/show/${movie.id}`}>
                                    <h5 className='card-title'>{movie.name}</h5>
                                </Link>
                                <p className='card-text'>{movie.summary?.replace(/<[^>]*>/g, '').substring(0, 100)}...</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home