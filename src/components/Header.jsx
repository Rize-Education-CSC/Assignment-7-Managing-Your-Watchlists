import { useState } from 'react'
import { Link } from 'react-router-dom'

function Header({ onSearch }) {
  const [query, setQuery] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="app-title">MovieShelf</Link>

        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/favorites" className="nav-link">Favorites</Link>
          <Link to="/watchlist" className="nav-link">Watchlist</Link> {/* ✅ ADD */}
        </nav>

        <form onSubmit={handleSubmit} className="search-container">
          <input
            type="text"
            placeholder="Search movies..."
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search-button" type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  )
}

export default Header
