function RegionFilter({ regions, regionCounts, selectedRegion, onSelectRegion }) {
  return (
    <div className="region-filter" aria-label="Region filters">
      {regions.map((region) => (
        <button
          key={region}
          type="button"
          className={`region-btn${selectedRegion === region ? ' active' : ''}`}
          onClick={() => onSelectRegion(region)}
        >
          {region}
          <span className="region-badge">{regionCounts[region] ?? 0}</span>
        </button>
      ))}
    </div>
  )
}

export default RegionFilter