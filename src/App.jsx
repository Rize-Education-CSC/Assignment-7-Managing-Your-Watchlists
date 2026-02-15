import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Watchlist from './pages/Watchlist'          // ✅ ADD
import { MovieProvider } from './contexts/MovieContext' // ✅ ADD
import { getPopularMovies, searchMovies } from './services/movieService'
import './App.css'

function App() {
  const [movies, setMovies] = useState([])
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const storedFavorites =
      JSON.parse(localStorage.getItem('favorites')) || []
    setFavorites(storedFavorites)
  }, [])

  useEffect(() => {
    loadPopularMovies()
  }, [])

  async function loadPopularMovies() {
    try {
      setLoading(true)
      setError(null)
      const data = await getPopularMovies()
      setMovies(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleSearch(query) {
    if (!query) {
      loadPopularMovies()
      return
    }

    try {
      setLoading(true)
      setError(null)
      const results = await searchMovies(query)
      setMovies(results)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function toggleFavorite(movie) {
    const exists = favorites.some((fav) => fav.id === movie.id)

    const updatedFavorites = exists
      ? favorites.filter((fav) => fav.id !== movie.id)
      : [...favorites, movie]

    setFavorites(updatedFavorites)
    localStorage.setItem(
      'favorites',
      JSON.stringify(updatedFavorites)
    )
  }

  return (
    <MovieProvider>   {/* ✅ WRAP APP */}
      <div className="app">
        <Header onSearch={handleSearch} />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                movies={movies}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                loading={loading}
                error={error}
              />
            }
          />

          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            }
          />

          <Route path="/watchlist" element={<Watchlist />} /> {/* ✅ ADD */}
        </Routes>
      </div>
    </MovieProvider>
  )
}

export default App
