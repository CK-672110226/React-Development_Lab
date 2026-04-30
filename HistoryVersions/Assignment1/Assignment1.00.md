# Assignment 1.00 History

Date: 23 April 2026 (23 เมษายน 2569)

## Overview

This history file preserves the original code before refactoring and records all changes implemented for the Product Gallery assignment.

## Original Code Snapshot

### Original ReactStudy/src/App.jsx

import Greeting from './Greeting.jsx'
import './App.css'

const tips = [
	'Domino effect: Start with one small task to build momentum.',
	'Stand up and stretch every hour to refresh your mind.',
	'Start with a 5-minute task to build momentum.',
	'Sleep more to boost creativity and problem-solving.',
]

function App() {
	return (
		<main className="page">
			<section className="card">
				<Greeting name="Chanachot Khamchum" />
				<div className="tips-block">
					<h2>Motivational Tips</h2>
					<ul className="tips-list">
						{tips.map((tip, index) => (
							<li key={index}>{tip}</li>
						))}
					</ul>
				</div>
			</section>
		</main>
	)
}

export default App;

### Original ReactStudy/src/App.css

.page {
	min-height: 100vh;
	display: grid;
	place-items: center;
	padding: 24px;
}

.card {
	width: min(760px, 92vw);
	background: linear-gradient(140deg, #fffaf0, #fff4d6);
	border: 1px solid #e9d8a6;
	border-radius: 24px;

	padding: 28px;
}

.greeting-label {
	margin: 0;
	color: #7c5a00;
	font-size: 0.9rem;
	letter-spacing: 0.12em;
	text-transform: uppercase;
}

.greeting-block h1 {
	margin: 8px 0 12px;
	color: #3d2a00;
	font-size: clamp(1.6rem, 4vw, 2.3rem);
	line-height: 1.15;
}

.date-time,
.hour-line,
.mood-line {
	margin: 0;
	color: #5f4808;
}

.hour-line {
	margin-top: 8px;
}

.mood-line {
	margin-top: 4px;
}

.tips-block {
	margin-top: 22px;
	padding-top: 18px;
	border-top: 1px solid #ead7ab;
}

.tips-block h2 {
	margin: 0 0 10px;
	font-size: 1.15rem;
	color: #3d2a00;
}

.tips-list {
	margin: 0;
	padding-left: 20px;
	display: grid;
	gap: 8px;
	color: #4a3703;
}

## Change Log

1. Added ReactStudy/src/data/products.js with 4 product items:
	 - Wireless Headphones
	 - Laptop Stand
	 - Mechanical Keyboard
	 - USB-C Hub
	 Each product has id, name, price, rating, reviews, inStock, category, image.

2. Added ReactStudy/src/components/RatingStars.jsx:
	 - Props: rating, reviews
	 - Logic:
		 - fullStars = Math.floor(rating)
		 - hasHalf = rating % 1 >= 0.5
		 - halfStar = hasHalf ? 1 : 0
		 - emptyStars = 5 - fullStars - halfStar
	 - Renders stars and review count text.

3. Added ReactStudy/src/components/ProductCard.jsx:
	 - Uses destructured props:
		 name, price, rating, reviews, inStock, category, image
	 - Adds unavailable class when out of stock.
	 - Shows badge:
		 - In Stock (green)
		 - Out of Stock (red)
	 - handleAddToCart:
		 - Alerts only when inStock is true
		 - Message format: Added "name" to cart! Price: $xx.xx
	 - Includes RatingStars component.
	 - Button behavior:
		 - disabled when out of stock
		 - text changes to Unavailable

4. Replaced ReactStudy/src/App.jsx:
	 - Imports products and ProductCard.
	 - Calculates availableCount from in-stock products.
	 - Maps product cards with:
		 - key={product.id}
		 - spread props {...product}

5. Replaced ReactStudy/src/App.css:
	 - Responsive grid layout for gallery.
	 - Card shadow and hover effect.
	 - Badge and button styling for modern UI.
	 - Unavailable visual state for out-of-stock items.

## Touched Files

- ReactStudy/src/data/products.js (new)
- ReactStudy/src/components/RatingStars.jsx (new)
- ReactStudy/src/components/ProductCard.jsx (new)
- ReactStudy/src/App.jsx (updated)
- ReactStudy/src/App.css (updated)
- HistoryVersions/Assignment1.00.md (updated)

## Additional Update: Description and Discount

Date: 23 April 2026 (23 เมษายน 2569)

1. Updated src/data/products.js:
	- Added description field to all products.
	- Added discount field (percentage) to all products.

2. Updated src/components/ProductCard.jsx:
	- Added description and discount to destructured props.
	- Rendered product description section under product name.
	- Rendered discount badge as -X% next to price.

3. Updated src/App.css:
	- Added styles for description text.
	- Added styles for price group and discount badge.

## Additional Update: Old Price + Discounted Price Display

Date: 23 April 2026 (23 เมษายน 2569)

1. Updated src/components/ProductCard.jsx:
	- Added price calculation for discounted price.
	- When discount exists, now shows old price and discounted price together.
	- Old price remains the original value, discounted price is calculated from percent.
	- If discount is missing, only normal price is shown.

2. Updated src/App.css:
	- Added old-price style with smaller font.
	- Added diagonal strike effect on old price.
	- Added sale-price style for discounted price emphasis.

## Additional Update: Hide Discount When Missing

Date: 23 April 2026 (23 เมษายน 2569)

1. Updated src/components/ProductCard.jsx:
	- Changed discount badge rendering to conditional display.
	- Discount badge now appears only when a valid discount exists.
	- Products without discount no longer show an empty or undefined discount value.

## Additional Update: Fix Button Overflow With Discount

Date: 23 April 2026 (23 เมษายน 2569)

1. Updated src/App.css:
	- Improved .card-footer layout to wrap content safely when discount pricing takes more space.
	- Added responsive button behavior so Add to Cart stays inside the card on all widths.
	- Added flex and wrap tuning for price group/price row to prevent horizontal overflow.
