import { useState } from 'react'
import './App.css'
import Dashboard from './components/Dashboard'
import Navigation from './components/Navigation'
import MediaPlayer from './components/MediaPlayer'
import Climate from './components/Climate'
import VehicleInfo from './components/VehicleInfo'
import Settings from './components/Settings'

export type ActiveScreen = 'dashboard' | 'navigation' | 'media' | 'climate' | 'vehicle' | 'settings'

function App() {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('dashboard')

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case 'dashboard':
        return <Dashboard />
      case 'navigation':
        return <Navigation />
      case 'media':
        return <MediaPlayer />
      case 'climate':
        return <Climate />
      case 'vehicle':
        return <VehicleInfo />
      case 'settings':
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="infotainment-system">
      <div className="main-content">
        {renderActiveScreen()}
      </div>
      <div className="bottom-nav">
        <button 
          className={`nav-btn ${activeScreen === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveScreen('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={`nav-btn ${activeScreen === 'navigation' ? 'active' : ''}`}
          onClick={() => setActiveScreen('navigation')}
        >
          Navigation
        </button>
        <button 
          className={`nav-btn ${activeScreen === 'media' ? 'active' : ''}`}
          onClick={() => setActiveScreen('media')}
        >
          Media
        </button>
        <button 
          className={`nav-btn ${activeScreen === 'climate' ? 'active' : ''}`}
          onClick={() => setActiveScreen('climate')}
        >
          Climate
        </button>
        <button 
          className={`nav-btn ${activeScreen === 'vehicle' ? 'active' : ''}`}
          onClick={() => setActiveScreen('vehicle')}
        >
          Vehicle
        </button>
        <button 
          className={`nav-btn ${activeScreen === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveScreen('settings')}
        >
          Settings
        </button>
      </div>
    </div>
  )
}

export default App
