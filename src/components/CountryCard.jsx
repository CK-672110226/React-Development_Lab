function CountryCard({ country, isFavorite, onToggleFavorite, onOpenDetails }) {
  const population = country.population.toLocaleString()
  const capital = country.capital ? country.capital[0] : 'N/A'
  const languages = country.languages
    ? Object.values(country.languages).slice(0, 2).join(', ')
    : 'N/A'

  return (
    <article className="country-card">
      <button
        type="button"
        className={`favorite-btn${isFavorite ? ' active' : ''}`}
        onClick={() => onToggleFavorite(country.cca3)}
        aria-label={isFavorite ? 'Remove favorite' : 'Add favorite'}
      >
        {isFavorite ? '★ Favourite' : '☆ Favourite'}
      </button>

      <img
        src={country.flags.svg}
        alt={`Flag of ${country.name.common}`}
        className="country-flag"
        loading="lazy"
      />
      <div className="country-info">
        <h3>{country.name.common}</h3>
        <p>
          <strong>Capital:</strong> {capital}
        </p>
        <p>
          <strong>Population:</strong> {population}
        </p>
        <p>
          <strong>Languages:</strong> {languages}
        </p>
        <button type="button" className="details-btn" onClick={() => onOpenDetails(country)}>
          View Details
        </button>
      </div>
    </article>
  )
}

export default CountryCard