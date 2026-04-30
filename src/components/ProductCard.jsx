import RatingStars from './RatingStars'

function ProductCard({
  name,
  price,
  discount,
  rating,
  reviews,
  inStock,
  category,
  description,
  image,
}) {
  const hasDiscount = typeof discount === 'number' && discount > 0
  const discountedPrice = hasDiscount ? price * (1 - discount / 100) : price

  function handleAddToCart() {
    if (inStock) {
      alert(`Added "${name}" to cart! Price: $${price.toFixed(2)}`)
    }
  }

  return (
    <article className={`product-card${!inStock ? ' unavailable' : ''}`}>
      <div className={`badge ${inStock ? 'badge-green' : 'badge-red'}`}>
        {inStock ? 'In Stock' : 'Out of Stock'}
      </div>

      <img src={image} alt={name} className="product-img" />
      <span className="category">{category}</span>
      <h3>{name}</h3>
      <p className="description">{description}</p>

      <RatingStars rating={rating} reviews={reviews} />

      <div className="card-footer">
        <div className="price-group">
          {hasDiscount ? (
            <>
              <div className="price-row">
                <span className="old-price">${price.toFixed(2)}</span>
                <strong className="sale-price">${discountedPrice.toFixed(2)}</strong>
              </div>
            </>
          ) : (
            <strong className="price">${price.toFixed(2)}</strong>
          )}
          {discount ? <span className="discount-pill">-{discount}%</span> : null}
        </div>
        <button onClick={handleAddToCart} disabled={!inStock} className="add-btn">
          {inStock ? 'Add to Cart' : 'Unavailable'}
        </button>
      </div>
    </article>
  )
}

export default ProductCard
