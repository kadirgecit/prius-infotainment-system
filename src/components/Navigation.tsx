import { useState } from 'react'
import { Navigation as NavIcon, MapPin, Route, Search, Home, Star } from 'lucide-react'

const Navigation = () => {
  const [destination, setDestination] = useState('')
  const [currentRoute, setCurrentRoute] = useState<any>(null)
  const [favorites] = useState([
    { name: 'Home', address: '123 Main St, Anytown, USA', icon: Home },
    { name: 'Work', address: '456 Business Ave, Downtown', icon: Star },
    { name: 'Grocery Store', address: '789 Market St, Shopping Center', icon: MapPin },
    { name: 'Gas Station', address: '321 Highway Blvd, Fuel Plaza', icon: MapPin }
  ])

  const handleSearch = () => {
    if (destination.trim()) {
      // Simulate route calculation
      setCurrentRoute({
        destination: destination,
        distance: '12.4 miles',
        duration: '18 minutes',
        arrival: new Date(Date.now() + 18 * 60 * 1000).toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      })
    }
  }

  const selectFavorite = (favorite: any) => {
    setDestination(favorite.address)
    setCurrentRoute({
      destination: favorite.name,
      distance: Math.floor(Math.random() * 20 + 5) + '.2 miles',
      duration: Math.floor(Math.random() * 25 + 10) + ' minutes',
      arrival: new Date(Date.now() + (Math.floor(Math.random() * 25 + 10)) * 60 * 1000).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    })
  }

  return (
    <div className="screen-container">
      <div className="screen-header">
        <NavIcon size={40} color="#00d4ff" />
        <h1 className="screen-title">Navigation</h1>
      </div>

      {/* Search Bar */}
      <div className="card">
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Search size={20} color="#00d4ff" />
          <input
            type="text"
            placeholder="Enter destination..."
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            style={{
              flex: 1,
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '8px',
              padding: '12px 16px',
              color: '#ffffff',
              fontSize: '16px'
            }}
          />
          <button className="btn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {/* Current Route */}
      {currentRoute && (
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
            <Route size={24} color="#00ff88" />
            <h3 style={{ color: '#00ff88' }}>Active Route</h3>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <div className="metric-value" style={{ fontSize: '20px', marginBottom: '5px' }}>
              {currentRoute.destination}
            </div>
          </div>

          <div className="grid grid-3">
            <div style={{ textAlign: 'center' }}>
              <div className="metric-value" style={{ fontSize: '24px' }}>{currentRoute.distance}</div>
              <div className="metric-label">Distance</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="metric-value" style={{ fontSize: '24px' }}>{currentRoute.duration}</div>
              <div className="metric-label">Duration</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="metric-value" style={{ fontSize: '24px' }}>{currentRoute.arrival}</div>
              <div className="metric-label">Arrival</div>
            </div>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            <button className="btn">Start Navigation</button>
            <button className="btn btn-secondary" onClick={() => setCurrentRoute(null)}>
              Cancel Route
            </button>
          </div>
        </div>
      )}

      {/* Map Placeholder */}
      <div className="card" style={{ minHeight: '300px', position: 'relative' }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: '#666'
        }}>
          <MapPin size={48} color="#00d4ff" style={{ marginBottom: '10px' }} />
          <div style={{ fontSize: '18px', marginBottom: '5px' }}>Map View</div>
          <div style={{ fontSize: '14px' }}>Interactive map would be displayed here</div>
        </div>
        
        {/* Map Controls */}
        <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button className="btn btn-secondary" style={{ padding: '8px 12px', fontSize: '12px' }}>
            Zoom In
          </button>
          <button className="btn btn-secondary" style={{ padding: '8px 12px', fontSize: '12px' }}>
            Zoom Out
          </button>
          <button className="btn btn-secondary" style={{ padding: '8px 12px', fontSize: '12px' }}>
            Center
          </button>
        </div>
      </div>

      {/* Favorites */}
      <div className="card">
        <h3 style={{ marginBottom: '20px', color: '#00d4ff' }}>Favorite Destinations</h3>
        <div className="grid grid-2">
          {favorites.map((favorite, index) => {
            const IconComponent = favorite.icon
            return (
              <div 
                key={index}
                onClick={() => selectFavorite(favorite)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  padding: '15px',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0,212,255,0.1)'
                  e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                }}
              >
                <IconComponent size={20} color="#00d4ff" />
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '4px' }}>{favorite.name}</div>
                  <div style={{ fontSize: '14px', color: '#cccccc' }}>{favorite.address}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Navigation Settings */}
      <div className="card">
        <h3 style={{ marginBottom: '15px', color: '#00d4ff' }}>Navigation Settings</h3>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <button className="btn btn-secondary">Avoid Highways</button>
          <button className="btn btn-secondary">Avoid Tolls</button>
          <button className="btn btn-secondary">Eco Route</button>
          <button className="btn btn-secondary">Voice Guidance</button>
        </div>
      </div>
    </div>
  )
}

export default Navigation