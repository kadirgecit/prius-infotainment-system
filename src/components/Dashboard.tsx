import { useState, useEffect } from 'react'
import { Gauge, Battery, Fuel, Thermometer, Clock } from 'lucide-react'

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [speed, setSpeed] = useState(0)
  const [batteryLevel, setBatteryLevel] = useState(85)
  const [fuelLevel, setFuelLevel] = useState(78)
  const [engineTemp, setEngineTemp] = useState(92)
  const [hybridMode, setHybridMode] = useState<'eco' | 'normal' | 'power'>('eco')

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      // Simulate dynamic data
      setSpeed(Math.floor(Math.random() * 80) + 20)
      setBatteryLevel(Math.max(20, Math.min(100, batteryLevel + (Math.random() - 0.5) * 2)))
      setFuelLevel(Math.max(10, Math.min(100, fuelLevel + (Math.random() - 0.5) * 0.5)))
      setEngineTemp(Math.max(80, Math.min(110, engineTemp + (Math.random() - 0.5) * 2)))
    }, 2000)

    return () => clearInterval(timer)
  }, [batteryLevel, fuelLevel, engineTemp])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div className="screen-container">
      <div className="screen-header">
        <Gauge size={40} color="#00d4ff" />
        <h1 className="screen-title">Dashboard</h1>
      </div>

      {/* Time and Date */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Clock size={24} color="#00d4ff" />
          <div>
            <div className="metric-value">{formatTime(currentTime)}</div>
            <div className="metric-label">{formatDate(currentTime)}</div>
          </div>
        </div>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-2">
        {/* Speed */}
        <div className="card">
          <div style={{ textAlign: 'center' }}>
            <div className="metric-value" style={{ fontSize: '48px' }}>{speed}</div>
            <div className="metric-label">MPH</div>
            <div style={{ marginTop: '10px', height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px' }}>
              <div 
                style={{ 
                  height: '100%', 
                  background: 'linear-gradient(90deg, #00ff88, #00d4ff)', 
                  borderRadius: '2px',
                  width: `${Math.min(100, (speed / 80) * 100)}%`,
                  transition: 'width 0.3s ease'
                }}
              />
            </div>
          </div>
        </div>

        {/* Hybrid System Status */}
        <div className="card">
          <h3 style={{ marginBottom: '15px', color: '#00d4ff' }}>Hybrid System</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <button 
              className={`btn ${hybridMode === 'eco' ? '' : 'btn-secondary'}`}
              onClick={() => setHybridMode('eco')}
              style={{ fontSize: '12px', padding: '8px 16px' }}
            >
              ECO
            </button>
            <button 
              className={`btn ${hybridMode === 'normal' ? '' : 'btn-secondary'}`}
              onClick={() => setHybridMode('normal')}
              style={{ fontSize: '12px', padding: '8px 16px' }}
            >
              NORMAL
            </button>
            <button 
              className={`btn ${hybridMode === 'power' ? '' : 'btn-secondary'}`}
              onClick={() => setHybridMode('power')}
              style={{ fontSize: '12px', padding: '8px 16px' }}
            >
              POWER
            </button>
          </div>
          <div style={{ textAlign: 'center' }}>
            <span className="status-indicator status-good"></span>
            <span>System Active</span>
          </div>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-3">
        {/* Battery Level */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <Battery size={20} color="#00ff88" />
            <span style={{ fontSize: '16px', fontWeight: '600' }}>Battery</span>
          </div>
          <div className="metric-value">{batteryLevel.toFixed(0)}%</div>
          <div style={{ marginTop: '10px', height: '6px', background: 'rgba(255,255,255,0.2)', borderRadius: '3px' }}>
            <div 
              style={{ 
                height: '100%', 
                background: batteryLevel > 50 ? '#00ff88' : batteryLevel > 20 ? '#ffaa00' : '#ff4444',
                borderRadius: '3px',
                width: `${batteryLevel}%`,
                transition: 'all 0.3s ease',
                boxShadow: `0 0 10px ${batteryLevel > 50 ? 'rgba(0,255,136,0.5)' : batteryLevel > 20 ? 'rgba(255,170,0,0.5)' : 'rgba(255,68,68,0.5)'}`
              }}
            />
          </div>
        </div>

        {/* Fuel Level */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <Fuel size={20} color="#00d4ff" />
            <span style={{ fontSize: '16px', fontWeight: '600' }}>Fuel</span>
          </div>
          <div className="metric-value">{fuelLevel.toFixed(0)}%</div>
          <div style={{ marginTop: '10px', height: '6px', background: 'rgba(255,255,255,0.2)', borderRadius: '3px' }}>
            <div 
              style={{ 
                height: '100%', 
                background: fuelLevel > 25 ? '#00d4ff' : '#ff4444',
                borderRadius: '3px',
                width: `${fuelLevel}%`,
                transition: 'all 0.3s ease',
                boxShadow: `0 0 10px ${fuelLevel > 25 ? 'rgba(0,212,255,0.5)' : 'rgba(255,68,68,0.5)'}`
              }}
            />
          </div>
        </div>

        {/* Engine Temperature */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <Thermometer size={20} color="#ffaa00" />
            <span style={{ fontSize: '16px', fontWeight: '600' }}>Engine Temp</span>
          </div>
          <div className="metric-value">{engineTemp.toFixed(0)}°F</div>
          <div style={{ marginTop: '10px' }}>
            <span 
              className={`status-indicator ${
                engineTemp < 100 ? 'status-good' : 
                engineTemp < 105 ? 'status-warning' : 'status-error'
              }`}
            ></span>
            <span style={{ fontSize: '14px' }}>
              {engineTemp < 100 ? 'Normal' : engineTemp < 105 ? 'Warm' : 'Hot'}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 style={{ marginBottom: '15px', color: '#00d4ff' }}>Quick Actions</h3>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <button className="btn">Trip Computer</button>
          <button className="btn btn-secondary">Maintenance</button>
          <button className="btn btn-secondary">Diagnostics</button>
          <button className="btn btn-secondary">Energy Monitor</button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard