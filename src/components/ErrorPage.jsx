import { useEffect, useMemo, useRef } from 'react'
import './ErrorPage.css'

function getErrorContent(errorMessage) {
  const message = String(errorMessage || 'Unknown error')
  const httpMatch = message.match(/HTTP Error:\s*(\d+)/i)
  const statusCode = httpMatch ? Number(httpMatch[1]) : null

  if (statusCode === 404) {
    return {
      code: '404',
      title: 'Page not found',
      description: 'The resource you requested could not be found.',
      fixes: [
        'Check if the API endpoint URL is correct.',
        'Verify path and query fields expected by the API.',
        'Try again from home to re-request data.',
      ],
    }
  }

  if (statusCode === 400 || statusCode === 401 || statusCode === 403 || statusCode === 422) {
    return {
      code: String(statusCode),
      title: 'Request cannot be processed',
      description: 'The request format or permissions are not accepted by the API.',
      fixes: [
        'Review query parameters and request format.',
        'Check whether the API requires authentication or specific fields.',
        'Return to home and retry with a fresh request.',
      ],
    }
  }

  if (statusCode && statusCode >= 500) {
    return {
      code: String(statusCode),
      title: 'Server unavailable',
      description: 'The server has a temporary issue and cannot process this request.',
      fixes: [
        'Wait a moment and retry.',
        'Check API service status page if available.',
        'Return to home and request again.',
      ],
    }
  }

  if (/failed to fetch|networkerror|network error/i.test(message)) {
    return {
      code: 'NET',
      title: 'Network error',
      description: 'Connection to the API failed before receiving a valid response.',
      fixes: [
        'Check your internet connection.',
        'Verify firewall, proxy, or CORS restrictions.',
        'Return to home and retry the request.',
      ],
    }
  }

  return {
    code: 'ERR',
    title: 'Something went wrong',
    description: 'An unexpected error occurred while loading data.',
    fixes: [
      'Refresh and try again from home.',
      'Check browser console for more details.',
      'Validate API response format and required fields.',
    ],
  }
}

function ErrorPage({ errorMessage, onBackHome }) {
  const imageRef = useRef(null)
  const content = useMemo(() => getErrorContent(errorMessage), [errorMessage])

  useEffect(() => {
    let lFollowX = 0
    let lFollowY = 0
    let x = 0
    let y = 0
    const friction = 1 / 30

    function animate() {
      x += (lFollowX - x) * friction
      y += (lFollowY - y) * friction

      if (imageRef.current) {
        imageRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.1)`
      }

      frameId = window.requestAnimationFrame(animate)
    }

    function handlePointer(event) {
      const lMouseX = Math.max(-100, Math.min(100, window.innerWidth / 2 - event.clientX))
      const lMouseY = Math.max(-100, Math.min(100, window.innerHeight / 2 - event.clientY))

      lFollowX = (20 * lMouseX) / 100
      lFollowY = (10 * lMouseY) / 100
    }

    let frameId = window.requestAnimationFrame(animate)
    window.addEventListener('mousemove', handlePointer)
    window.addEventListener('click', handlePointer)

    return () => {
      window.removeEventListener('mousemove', handlePointer)
      window.removeEventListener('click', handlePointer)
      window.cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <main className="error-screen" role="alert" aria-live="assertive">
      <section className="error-page">
        <header className="error-header">
          <div className="error-logo" aria-label="Daily UI">
            DAILY UI
          </div>
        </header>

        <div className="error-content">
          <h1>{content.code}</h1>
          <h2>{content.title}</h2>
          <p>{content.description}</p>
          <ul className="error-fixes">
            {content.fixes.map((fix) => (
              <li key={fix}>{fix}</li>
            ))}
          </ul>
          <button type="button" className="error-back-btn" onClick={onBackHome}>
            back to home
          </button>
          <small className="error-raw">Raw: {String(errorMessage || 'Unknown error')}</small>
        </div>

        <img
          ref={imageRef}
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
          alt="Abstract misty background"
          className="error-bg-image"
        />
      </section>
    </main>
  )
}

export default ErrorPage