import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    const [movies, setMovies] = useState([])
    const [search, setSearch] = useState('')
    const [isSearching, setIsSearching] = useState(false)
    

    useEffect( () => {
        const fetchInitialMovies = async () => {
            try {
                // Using the shows endpoint to get a list of shows
                const response = await fetch('https://api.tvmaze.com/shows')
                const data = await response.json()
                // TVMaze returns an array directly, not nested in 'results'
                setMovies(data.slice(0,30)) // Limiting to first 30 shows for performance
            } catch (error) {
                console.error('Error fetching movies:', error)
            }
        }
        fetchInitialMovies()
    }, [] )

    // Search API when user types (with debounce)
    useEffect(() => {
        if (search.trim() === '') {
            // If search is empty, show initial shows
            const fetchInitialMovies = async () => {
                try {
                    const response = await fetch('https://api.tvmaze.com/shows')
                    const data = await response.json()
                    setMovies(data.slice(0, 20))
                } catch (error) {
                    console.error('Error fetching initial movies:', error)
                }
            }
            fetchInitialMovies()
            return
        }

        // Debounce search - wait 500ms after user stops typing
        const timeoutId = setTimeout(async () => {
            setIsSearching(true)
            try {
                // Use TVMaze search endpoint
                const response = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(search)}`)
                const data = await response.json()
                
                // TVMaze search returns array of objects with 'show' property
                const searchResults = data.map(result => result.show)
                setMovies(searchResults)
            } catch (error) {
                console.error('Error searching movies:', error)
                setMovies([])
            } finally {
                setIsSearching(false)
            }
        }, 500) // Wait 500ms before searching

        // Cleanup timeout if user types again
        return () => clearTimeout(timeoutId)
    }, [search])

    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    // const filteredMovies = movies.filter(movie => 
    //     movie.name.toLowerCase().includes(search.toLowerCase())
    // )

    return (
        <div className='container'>
            <div>
                <h1>TV Movies & Shows</h1>
                <p>{search ? `Search results for: "${search}"` : 'Popular Shows'}</p>
            
            </div>

            <form className='form-inline w-100 mb-3' onSubmit={(e) => e.preventDefault()}>
                <input 
                    type='text'
                    className='form-control'
                    placeholder='Search for a movie'
                    value={search}
                    onChange={handleSearch}
                />
                {isSearching && <small>Searching...</small>}
            </form>

            <div className='row'>
                {movies.length === 0 && !isSearching && search ? (
                    <div className='col-12'> 
                        <p>No shows found for "{search}. Try different search term, thank you."</p>
                    </div>
                )   :   (
                    movies.map( (movie, index) => (
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
                                    <p className='card-text'>
                                        {movie.summary?.replace(/<[^>]*>/g, '').substring(0, 100)}...
                                    </p>
                                    <small className='text-muted'>
                                        {movie.genres?.join(', ') || 'No genres listed'}
                                    </small>
                                </div>
                            </div>
                        </div>
                    ) )
                )}
            </div>

            <div className='mt-4'>
                <small className='text-muted'>
                    Showing {movies.length} results
                </small>
            </div>

        </div>
    )
}

export default Home