import { createContext, useContext, useEffect, useState } from 'react'

const MovieContext = createContext()

export function MovieProvider({ children }) {
  const [watchlist, setWatchlist] = useState([])

  // Load from localStorage on first render
  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem('watchlist')) || []
    setWatchlist(saved)
  }, [])

  // Save whenever watchlist changes
  useEffect(() => {
    localStorage.setItem(
      'watchlist',
      JSON.stringify(watchlist)
    )
  }, [watchlist])

  function addToWatchlist(movie) {
    if (!watchlist.some(m => m.id === movie.id)) {
      setWatchlist(prev => [...prev, movie])
    }
  }

  function removeFromWatchlist(movieId) {
    setWatchlist(prev =>
      prev.filter(movie => movie.id !== movieId)
    )
  }

  function isInWatchlist(movieId) {
    return watchlist.some(movie => movie.id === movieId)
  }

  return (
    <MovieContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist
      }}
    >
      {children}
    </MovieContext.Provider>
  )
}

export function useMovieContext() {
  return useContext(MovieContext)
}
