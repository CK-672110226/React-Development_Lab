import { useRef } from 'react'

function SearchBar({ onSearch, searchTerm }) {
  const inputRef = useRef(null)

  function handleClear() {
    onSearch('')
    inputRef.current?.focus()
  }

  return (
    <div className="search-container">
      <input
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={(event) => onSearch(event.target.value)}
        placeholder="Search for a country..."
        className="search-input"
      />
      {searchTerm && (
        <button type="button" className="clear-search-btn" onClick={handleClear}>
          ✕
        </button>
      )}
    </div>
  )
}

export default SearchBar