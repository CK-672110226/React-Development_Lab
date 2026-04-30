import { useEffect } from 'react'

function CountryModal({ country, onClose }) {
  const capital = country.capital ? country.capital.join(', ') : 'N/A'
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((currency) => `${currency.name} (${currency.symbol || '-'})`)
        .join(', ')
    : 'N/A'
  const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A'

  useEffect(() => {
    const previousOverflow = document.body.style.overflow

    function handleKeydown(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeydown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [onClose])

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <section className="country-modal" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="modal-close-btn" onClick={onClose}>
          Close
        </button>
        <h2>{country.name.common}</h2>
        <img
          src={country.flags.svg}
          alt={`Flag of ${country.name.common}`}
          className="modal-flag"
        />
        <p>
          <strong>Official name:</strong> {country.name.official}
        </p>
        <p>
          <strong>Region:</strong> {country.region || 'N/A'}
        </p>
        <p>
          <strong>Subregion:</strong> {country.subregion || 'N/A'}
        </p>
        <p>
          <strong>Capital:</strong> {capital}
        </p>
        <p>
          <strong>Population:</strong> {country.population.toLocaleString()}
        </p>
        <p>
          <strong>Languages:</strong> {languages}
        </p>
        <p>
          <strong>Currencies:</strong> {currencies}
        </p>
        <p>
          <strong>Timezones:</strong> {country.timezones?.join(', ') || 'N/A'}
        </p>
      </section>
    </div>
  )
}

export default CountryModal