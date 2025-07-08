import { useState } from 'react'
import { Thermometer, Wind, Snowflake, Sun, Fan, Car } from 'lucide-react'

const Climate = () => {
  const [isOn, setIsOn] = useState(true)
  const [temperature, setTemperature] = useState(72)
  const [fanSpeed, setFanSpeed] = useState(3)
  const [mode, setMode] = useState<'auto' | 'heat' | 'cool' | 'defrost'>('auto')
  const [airDirection, setAirDirection] = useState<'face' | 'feet' | 'windshield' | 'mixed'>('face')
  const [recirculation, setRecirculation] = useState(false)
  const [rearDefrost, setRearDefrost] = useState(false)
  const [dualZone, setDualZone] = useState(false)
  const [passengerTemp, setPassengerTemp] = useState(72)
  const [outsideTemp] = useState(68)

  const adjustTemperature = (delta: number, isPassenger = false) => {
    if (isPassenger && dualZone) {
      setPassengerTemp(Math.max(60, Math.min(85, passengerTemp + delta)))
    } else {
      setTemperature(Math.max(60, Math.min(85, temperature + delta)))
    }
  }

  const getModeIcon = (currentMode: string) => {
    switch (currentMode) {
      case 'heat': return <Sun size={20} color="#ff6b35" />
      case 'cool': return <Snowflake size={20} color="#00d4ff" />
      case 'defrost': return <Wind size={20} color="#ffaa00" />
      default: return <Thermometer size={20} color="#00ff88" />
    }
  }



  return (
    <div className="screen-container">
      <div className="screen-header">
        <Thermometer size={40} color="#00d4ff" />
        <h1 className="screen-title">Climate Control</h1>
      </div>

      {/* Power and Mode */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button 
              className={`btn ${isOn ? '' : 'btn-secondary'}`}
              onClick={() => setIsOn(!isOn)}
              style={{ padding: '12px 24px' }}
            >
              {isOn ? 'ON' : 'OFF'}
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Thermometer size={20} color="#00d4ff" />
              <span>Outside: {outsideTemp}°F</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              className={`btn ${mode === 'auto' ? '' : 'btn-secondary'}`}
              onClick={() => setMode('auto')}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px' }}
            >
              {getModeIcon('auto')}
              AUTO
            </button>
            <button 
              className={`btn ${mode === 'heat' ? '' : 'btn-secondary'}`}
              onClick={() => setMode('heat')}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px' }}
            >
              {getModeIcon('heat')}
              HEAT
            </button>
            <button 
              className={`btn ${mode === 'cool' ? '' : 'btn-secondary'}`}
              onClick={() => setMode('cool')}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px' }}
            >
              {getModeIcon('cool')}
              COOL
            </button>
          </div>
        </div>
      </div>

      {/* Temperature Controls */}
      <div className="grid grid-2">
        {/* Driver Temperature */}
        <div className="card">
          <h3 style={{ marginBottom: '20px', color: '#00d4ff', textAlign: 'center' }}>
            Driver Temperature
          </h3>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div className="metric-value" style={{ fontSize: '48px' }}>{temperature}°</div>
            <div className="metric-label">Fahrenheit</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <button 
              className="btn btn-secondary"
              onClick={() => adjustTemperature(-1)}
              disabled={!isOn}
              style={{ 
                width: '60px', 
                height: '60px', 
                borderRadius: '50%', 
                fontSize: '24px',
                opacity: isOn ? 1 : 0.5
              }}
            >
              -
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => adjustTemperature(1)}
              disabled={!isOn}
              style={{ 
                width: '60px', 
                height: '60px', 
                borderRadius: '50%', 
                fontSize: '24px',
                opacity: isOn ? 1 : 0.5
              }}
            >
              +
            </button>
          </div>
        </div>

        {/* Passenger Temperature (if dual zone) */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ color: '#00d4ff' }}>Passenger</h3>
            <button 
              className={`btn ${dualZone ? '' : 'btn-secondary'}`}
              onClick={() => setDualZone(!dualZone)}
              style={{ fontSize: '12px', padding: '6px 12px' }}
            >
              DUAL ZONE
            </button>
          </div>
          
          {dualZone ? (
            <>
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div className="metric-value" style={{ fontSize: '48px' }}>{passengerTemp}°</div>
                <div className="metric-label">Fahrenheit</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                <button 
                  className="btn btn-secondary"
                  onClick={() => adjustTemperature(-1, true)}
                  disabled={!isOn}
                  style={{ 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '50%', 
                    fontSize: '24px',
                    opacity: isOn ? 1 : 0.5
                  }}
                >
                  -
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => adjustTemperature(1, true)}
                  disabled={!isOn}
                  style={{ 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '50%', 
                    fontSize: '24px',
                    opacity: isOn ? 1 : 0.5
                  }}
                >
                  +
                </button>
              </div>
            </>
          ) : (
            <div style={{ 
              textAlign: 'center', 
              color: '#666', 
              padding: '40px 20px',
              fontSize: '16px'
            }}>
              Enable dual zone for independent passenger control
            </div>
          )}
        </div>
      </div>

      {/* Fan Speed */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
          <Fan size={24} color="#00d4ff" />
          <h3 style={{ color: '#00d4ff' }}>Fan Speed</h3>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ minWidth: '60px' }}>Speed {fanSpeed}</span>
          <input
            type="range"
            min="0"
            max="5"
            value={fanSpeed}
            onChange={(e) => setFanSpeed(Number(e.target.value))}
            disabled={!isOn}
            style={{
              flex: 1,
              height: '8px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '4px',
              outline: 'none',
              cursor: 'pointer',
              opacity: isOn ? 1 : 0.5
            }}
          />
          <div style={{ display: 'flex', gap: '5px' }}>
            {[1, 2, 3, 4, 5].map(speed => (
              <div
                key={speed}
                style={{
                  width: '12px',
                  height: `${speed * 4 + 8}px`,
                  background: fanSpeed >= speed ? '#00d4ff' : 'rgba(255,255,255,0.3)',
                  borderRadius: '2px',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Air Direction and Options */}
      <div className="grid grid-2">
        <div className="card">
          <h3 style={{ marginBottom: '20px', color: '#00d4ff' }}>Air Direction</h3>
          <div className="grid grid-2" style={{ gap: '10px' }}>
            {[
              { key: 'face', label: 'Face', icon: '👤' },
              { key: 'feet', label: 'Feet', icon: '🦶' },
              { key: 'windshield', label: 'Windshield', icon: '🚗' },
              { key: 'mixed', label: 'Mixed', icon: '🔄' }
            ].map(direction => (
              <button
                key={direction.key}
                className={`btn ${airDirection === direction.key ? '' : 'btn-secondary'}`}
                onClick={() => setAirDirection(direction.key as any)}
                disabled={!isOn}
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  gap: '8px',
                  padding: '15px',
                  opacity: isOn ? 1 : 0.5
                }}
              >
                <span style={{ fontSize: '20px' }}>{direction.icon}</span>
                <span style={{ fontSize: '12px' }}>{direction.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '20px', color: '#00d4ff' }}>Options</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <button 
              className={`btn ${recirculation ? '' : 'btn-secondary'}`}
              onClick={() => setRecirculation(!recirculation)}
              disabled={!isOn}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px',
                opacity: isOn ? 1 : 0.5
              }}
            >
              <Car size={16} />
              Recirculation
            </button>
            
            <button 
              className={`btn ${rearDefrost ? '' : 'btn-secondary'}`}
              onClick={() => setRearDefrost(!rearDefrost)}
              disabled={!isOn}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px',
                opacity: isOn ? 1 : 0.5
              }}
            >
              <Wind size={16} />
              Rear Defrost
            </button>
            
            <button 
              className={`btn ${mode === 'defrost' ? '' : 'btn-secondary'}`}
              onClick={() => setMode(mode === 'defrost' ? 'auto' : 'defrost')}
              disabled={!isOn}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px',
                opacity: isOn ? 1 : 0.5
              }}
            >
              <Snowflake size={16} />
              Front Defrost
            </button>
          </div>
        </div>
      </div>

      {/* Climate Status */}
      <div className="card">
        <h3 style={{ marginBottom: '15px', color: '#00d4ff' }}>System Status</h3>
        <div className="grid grid-3">
          <div style={{ textAlign: 'center' }}>
            <span className={`status-indicator ${isOn ? 'status-good' : 'status-error'}`}></span>
            <div style={{ fontSize: '14px' }}>System {isOn ? 'Active' : 'Off'}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <span className="status-indicator status-good"></span>
            <div style={{ fontSize: '14px' }}>Air Quality Good</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <span className={`status-indicator ${recirculation ? 'status-warning' : 'status-good'}`}></span>
            <div style={{ fontSize: '14px' }}>
              {recirculation ? 'Recirculating' : 'Fresh Air'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Climate