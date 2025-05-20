import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [gifs, setGifs] = useState([])
  const apiKey = import.meta.env.VITE_GIPHY_API_KEY
  
  useEffect(()=> {
    const fetchGifs = async () => {
      const response = await fetch(
        'https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=20&offset=0&rating=g&bundle=messaging_non_clips'
      )
      const results = await response.json()
      setGifs(results.data)
    }

    fetchGifs()
  }, [])

  return (
    <>
     
    </>
  )
}

export default App
