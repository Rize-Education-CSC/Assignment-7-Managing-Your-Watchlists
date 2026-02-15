import { useMovieContext } from '../contexts/MovieContext'
import MovieCard from '../components/MovieCard'

function Watchlist() {
  const { watchlist } = useMovieContext()

  if (watchlist.length === 0) {
    return (
      <div className="main-content">
        <p>No movies in your watchlist yet.</p>
      </div>
    )
  }

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>My Watchlist</h2>
        <p>Movies you plan to watch</p>
      </div>

      <div className="movie-grid">
        {watchlist.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </main>
  )
}

export default Watchlist
