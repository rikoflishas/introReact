import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const [pokemons, setPokemons] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon')
      const data = await response.json()
      setPokemons(data.results)
    }
    fetchPokemons()
  }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='container'>
      <h1>Home</h1>

      <form className='form-inline w-100 mb-3'>
        <input
          type='text'
          className='form-control'
          placeholder='Search for a Pokémon'
          value={search}
          onChange={handleSearch}
        />
      </form>

      <div className='row'>
        {filteredPokemons.map((pokemon, index) => (
          <div className='col-4' key={index}>
            <div className='card mb-3'>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`}
                className='card-img-top'
                alt={pokemon.name}
              />
              <div className='card-body'>
                <Link to={`/pokemon/${pokemon.url.split('/')[6]}`} className='btn btn-warning'>
                  <h5 className='card-title'>{pokemon.name}</h5>
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
