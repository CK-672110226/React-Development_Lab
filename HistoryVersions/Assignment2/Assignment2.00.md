# Assignment 2.00 History

Date: 23 April 2026 (23 เมษายน 2569)

## Overview

This history file records all work done for Session 2: Components & Props.
The goal was to build a responsive Product Card Gallery using React + Vite,
demonstrating reusable components, props drilling, conditional rendering,
and the spread operator.

## Code Snapshot

### src/data/products.js

const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 89.99,
    rating: 4.5,
    reviews: 128,
    inStock: true,
    category: 'Electronics',
    image: 'https://picsum.photos/200/150',
  },
  {
    id: 2,
    name: 'Laptop Stand',
    price: 49.99,
    rating: 4.8,
    reviews: 256,
    inStock: true,
    category: 'Accessories',
    image: 'https://fastly.picsum.photos/id/643/200/150.jpg?hmac=Upgyc8s0QQ-_DxehorwKqFk0-Xs5ccTiPIcR9JJWEn8',
  },
  {
    id: 3,
    name: 'Mechanical Keyboard',
    price: 129.99,
    rating: 4.3,
    reviews: 89,
    inStock: false,
    category: 'Electronics',
    image: 'https://fastly.picsum.photos/id/498/200/150.jpg?hmac=UwjoXed1WDoT8MewpX6rGHPgkmNZI6ltsl_pAHQJbi4',
  },
  {
    id: 4,
    name: 'USB-C Hub',
    price: 39.99,
    rating: 4.6,
    reviews: 342,
    inStock: true,
    category: 'Accessories',
    image: 'https://fastly.picsum.photos/id/363/200/150.jpg?hmac=bwQK6Rqf9llvrdyf86V3ogtMhv5m0yemuc989WNbWUs',
  },
]

export default products

### src/components/RatingStars.jsx

function RatingStars({ rating, reviews }) {
  const fullStars = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5
  const halfStar = hasHalf ? 1 : 0
  const emptyStars = 5 - fullStars - halfStar

  return (
    <div className="rating">
      <span>
        {'★'.repeat(fullStars)}
        {hasHalf ? '☆' : ''}
        {'☆'.repeat(emptyStars)}
      </span>
      <span className="review-count">({reviews} reviews)</span>
    </div>
  )
}

export default RatingStars

### src/components/ProductCard.jsx

import RatingStars from './RatingStars'

function ProductCard({ name, price, rating, reviews, inStock, category, image }) {
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

      <RatingStars rating={rating} reviews={reviews} />

      <div className="card-footer">
        <strong className="price">${price.toFixed(2)}</strong>
        <button onClick={handleAddToCart} disabled={!inStock} className="add-btn">
          {inStock ? 'Add to Cart' : 'Unavailable'}
        </button>
      </div>
    </article>
  )
}

export default ProductCard

### src/App.jsx

import './App.css'
import ProductCard from './components/ProductCard'
import products from './data/products'

function App() {
  const availableCount = products.filter((product) => product.inStock).length

  return (
    <div className="app">
      <header className="app-header">
        <h1>Tech Shop</h1>
        <p>
          {products.length} products | {availableCount} available
        </p>
      </header>

      <section className="gallery-grid">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </section>
    </div>
  )
}

export default App

## Change Log

1. Added src/data/products.js with 4 product items:
   - Wireless Headphones (Electronics, inStock: true)
   - Laptop Stand (Accessories, inStock: true)
   - Mechanical Keyboard (Electronics, inStock: false)
   - USB-C Hub (Accessories, inStock: true)
   Each product has id, name, price, rating, reviews, inStock, category, image.

2. Added src/components/RatingStars.jsx:
   - Props: rating, reviews
   - Logic:
     - fullStars = Math.floor(rating)
     - hasHalf = rating % 1 >= 0.5
     - halfStar = hasHalf ? 1 : 0
     - emptyStars = 5 - fullStars - halfStar
   - Total star symbols always equals exactly 5.
   - Renders review count as: (N reviews)

3. Added src/components/ProductCard.jsx:
   - Destructured props: name, price, rating, reviews, inStock, category, image
   - Root element uses article tag instead of div for semantic HTML.
   - Applies unavailable class when inStock is false (opacity: 0.7).
   - Badge shows In Stock (green) or Out of Stock (red) conditionally.
   - handleAddToCart fires alert only when inStock is true.
     Alert message format: Added "name" to cart! Price: $xx.xx
   - Nested RatingStars component receives rating and reviews props.
   - Button is disabled when out of stock and label changes to Unavailable.

4. Replaced src/App.jsx:
   - Imports products array from data/products.js.
   - Imports ProductCard from components/ProductCard.jsx.
   - Calculates availableCount with products.filter(p => p.inStock).length.
   - Renders header showing total product count and available count.
   - Maps products with key={product.id} and spread operator {...product}.

5. Replaced src/App.css:
   - Responsive CSS grid: repeat(auto-fill, minmax(240px, 1fr))
   - Card surface with box-shadow and hover lift effect (translateY -6px).
   - Unavailable state via opacity: 0.7.
   - Badge pill styles for green (in stock) and red (out of stock).
   - Button states: active blue, disabled gray, hover darker blue.
   - aspect-ratio 4/3 on product images to prevent layout shift.
   - Mobile breakpoint at max-width 640px for spacing adjustments.

## Additional Improvements

- handleAddToCart has an inStock guard inside the function body in addition
  to the disabled attribute, so the alert cannot fire even if disabled is
  bypassed through browser DevTools.
- Star count is guaranteed to never exceed 5 because emptyStars is derived
  as 5 - fullStars - halfStar rather than being computed independently.
- product images use alt={name} for meaningful accessibility text instead
  of an empty string.

## Weak Points / Known Limitations

- No image fallback handler on img elements. If a picsum URL fails to load,
  the browser shows a broken image icon. An onError prop could redirect to
  a local placeholder image.
- The assignment spec mentions localhost:3000 (Create React App default).
  This project uses Vite which serves on localhost:5173. All other
  requirements are fully met.
- handleAddToCart only triggers a browser alert. There is no cart state,
  item count, or UI feedback beyond the popup.
- Product data is hardcoded in a static JS file. An empty array would
  render a blank gallery with no empty-state message for the user.
- availableCount is recalculated on every render. For 4 items this has no
  impact, but it would be a candidate for useMemo in a larger list.
- Greeting.jsx remains in src/ as an unused file after the refactor. It
  does not affect the build but should be deleted when confirmed unneeded.

## Touched Files

- src/data/products.js (new)
- src/components/RatingStars.jsx (new)
- src/components/ProductCard.jsx (new)
- src/App.jsx (updated)
- src/App.css (updated)
- HistoryVersions/Assignment2.00.md (updated)
