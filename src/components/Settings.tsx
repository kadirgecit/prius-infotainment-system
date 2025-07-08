import { useState } from 'react'
import { Settings as SettingsIcon, Monitor, Volume2, Bluetooth, Wifi, Clock, Shield } from 'lucide-react'

const Settings = () => {
  const [brightness, setBrightness] = useState(75)
  const [volume, setVolume] = useState(65)
  const [timeFormat, setTimeFormat] = useState<'12h' | '24h'>('12h')
  const [units, setUnits] = useState<'imperial' | 'metric'>('imperial')
  const [theme, setTheme] = useState<'dark' | 'light' | 'auto'>('dark')
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true)
  const [wifiEnabled, setWifiEnabled] = useState(false)
  const [autoLock, setAutoLock] = useState(true)
  const [voiceCommands, setVoiceCommands] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [language, setLanguage] = useState('English')
  const [autoStart, setAutoStart] = useState(false)

  const [connectedDevices] = useState([
    { name: "John's iPhone", type: 'phone', connected: true },
    { name: "Sarah's Android", type: 'phone', connected: false },
    { name: "Home WiFi", type: 'wifi', connected: false }
  ])

  const languages = ['English', 'Spanish', 'French', 'German', 'Japanese', 'Chinese']
  const themes = [
    { key: 'dark', name: 'Dark', color: '#1a1a1a' },
    { key: 'light', name: 'Light', color: '#ffffff' },
    { key: 'auto', name: 'Auto', color: 'linear-gradient(45deg, #1a1a1a, #ffffff)' }
  ]

  return (
    <div className="screen-container">
      <div className="screen-header">
        <SettingsIcon size={40} color="#00d4ff" />
        <h1 className="screen-title">Settings</h1>
      </div>

      {/* Display Settings */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
          <Monitor size={24} color="#00d4ff" />
          <h3 style={{ color: '#00d4ff' }}>Display</h3>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>Brightness</span>
            <span>{brightness}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            style={{
              width: '100%',
              height: '6px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '3px',
              outline: 'none',
              cursor: 'pointer'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ marginBottom: '10px' }}>Theme</div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {themes.map(themeOption => (
              <button
                key={themeOption.key}
                className={`btn ${theme === themeOption.key ? '' : 'btn-secondary'}`}
                onClick={() => setTheme(themeOption.key as any)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  padding: '8px 16px'
                }}
              >
                <div 
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: themeOption.color,
                    border: '1px solid rgba(255,255,255,0.3)'
                  }}
                />
                {themeOption.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div style={{ marginBottom: '10px' }}>Auto-dim at night</div>
          <button 
            className={`btn ${autoStart ? '' : 'btn-secondary'}`}
            onClick={() => setAutoStart(!autoStart)}
            style={{ padding: '8px 16px' }}
          >
            {autoStart ? 'Enabled' : 'Disabled'}
          </button>
        </div>
      </div>

      {/* Audio Settings */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
          <Volume2 size={24} color="#00d4ff" />
          <h3 style={{ color: '#00d4ff' }}>Audio</h3>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>Master Volume</span>
            <span>{volume}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            style={{
              width: '100%',
              height: '6px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '3px',
              outline: 'none',
              cursor: 'pointer'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <button 
            className={`btn ${voiceCommands ? '' : 'btn-secondary'}`}
            onClick={() => setVoiceCommands(!voiceCommands)}
          >
            Voice Commands
          </button>
          <button 
            className={`btn ${notifications ? '' : 'btn-secondary'}`}
            onClick={() => setNotifications(!notifications)}
          >
            Notifications
          </button>
          <button className="btn btn-secondary">
            Audio EQ
          </button>
        </div>
      </div>

      {/* Connectivity */}
      <div className="grid grid-2">
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
            <Bluetooth size={24} color="#00d4ff" />
            <h3 style={{ color: '#00d4ff' }}>Bluetooth</h3>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <button 
              className={`btn ${bluetoothEnabled ? '' : 'btn-secondary'}`}
              onClick={() => setBluetoothEnabled(!bluetoothEnabled)}
              style={{ width: '100%', marginBottom: '15px' }}
            >
              Bluetooth {bluetoothEnabled ? 'On' : 'Off'}
            </button>
          </div>

          {bluetoothEnabled && (
            <div>
              <div style={{ marginBottom: '10px', fontSize: '14px', color: '#cccccc' }}>
                Connected Devices
              </div>
              {connectedDevices.filter(d => d.type === 'phone').map((device, index) => (
                <div 
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <span>{device.name}</span>
                  <span 
                    className={`status-indicator ${device.connected ? 'status-good' : 'status-error'}`}
                  ></span>
                </div>
              ))}
              <button className="btn btn-secondary" style={{ marginTop: '10px', width: '100%' }}>
                Add Device
              </button>
            </div>
          )}
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
            <Wifi size={24} color="#00d4ff" />
            <h3 style={{ color: '#00d4ff' }}>Wi-Fi</h3>
          </div>
          
          <button 
            className={`btn ${wifiEnabled ? '' : 'btn-secondary'}`}
            onClick={() => setWifiEnabled(!wifiEnabled)}
            style={{ width: '100%', marginBottom: '15px' }}
          >
            Wi-Fi {wifiEnabled ? 'On' : 'Off'}
          </button>

          {wifiEnabled && (
            <div>
              <div style={{ marginBottom: '10px', fontSize: '14px', color: '#cccccc' }}>
                Available Networks
              </div>
              <div style={{ 
                padding: '20px', 
                textAlign: 'center', 
                color: '#666',
                border: '1px dashed rgba(255,255,255,0.3)',
                borderRadius: '8px'
              }}>
                Scanning for networks...
              </div>
            </div>
          )}
        </div>
      </div>

      {/* System Settings */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
          <Clock size={24} color="#00d4ff" />
          <h3 style={{ color: '#00d4ff' }}>System</h3>
        </div>
        
        <div className="grid grid-2">
          <div>
            <div style={{ marginBottom: '10px' }}>Time Format</div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                className={`btn ${timeFormat === '12h' ? '' : 'btn-secondary'}`}
                onClick={() => setTimeFormat('12h')}
                style={{ padding: '8px 16px' }}
              >
                12 Hour
              </button>
              <button 
                className={`btn ${timeFormat === '24h' ? '' : 'btn-secondary'}`}
                onClick={() => setTimeFormat('24h')}
                style={{ padding: '8px 16px' }}
              >
                24 Hour
              </button>
            </div>
          </div>

          <div>
            <div style={{ marginBottom: '10px' }}>Units</div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                className={`btn ${units === 'imperial' ? '' : 'btn-secondary'}`}
                onClick={() => setUnits('imperial')}
                style={{ padding: '8px 16px' }}
              >
                Imperial
              </button>
              <button 
                className={`btn ${units === 'metric' ? '' : 'btn-secondary'}`}
                onClick={() => setUnits('metric')}
                style={{ padding: '8px 16px' }}
              >
                Metric
              </button>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '20px' }}>
          <div style={{ marginBottom: '10px' }}>Language</div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '8px',
              padding: '8px 12px',
              color: '#ffffff',
              fontSize: '14px',
              width: '200px'
            }}
          >
            {languages.map(lang => (
              <option key={lang} value={lang} style={{ background: '#1a1a1a', color: '#ffffff' }}>
                {lang}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Security & Privacy */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
          <Shield size={24} color="#00d4ff" />
          <h3 style={{ color: '#00d4ff' }}>Security & Privacy</h3>
        </div>
        
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <button 
            className={`btn ${autoLock ? '' : 'btn-secondary'}`}
            onClick={() => setAutoLock(!autoLock)}
          >
            Auto Lock Screen
          </button>
          <button className="btn btn-secondary">
            Clear Data
          </button>
          <button className="btn btn-secondary">
            Privacy Settings
          </button>
          <button className="btn btn-secondary">
            Factory Reset
          </button>
        </div>
      </div>

      {/* About */}
      <div className="card">
        <h3 style={{ marginBottom: '20px', color: '#00d4ff' }}>About</h3>
        <div className="grid grid-2">
          <div>
            <div style={{ marginBottom: '15px' }}>
              <div style={{ fontSize: '14px', color: '#cccccc', marginBottom: '4px' }}>System Version</div>
              <div>Prius Infotainment v2.1.0</div>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <div style={{ fontSize: '14px', color: '#cccccc', marginBottom: '4px' }}>Build Date</div>
              <div>July 8, 2025</div>
            </div>
          </div>
          <div>
            <div style={{ marginBottom: '15px' }}>
              <div style={{ fontSize: '14px', color: '#cccccc', marginBottom: '4px' }}>Vehicle VIN</div>
              <div style={{ fontFamily: 'monospace', fontSize: '12px' }}>JTDKN3DU*A*123456</div>
            </div>
            <div>
              <button className="btn btn-secondary">
                Check for Updates
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings