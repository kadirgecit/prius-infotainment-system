import { useState, useEffect } from 'react'
import { Car, Battery, Fuel, Gauge, Wrench, AlertTriangle, CheckCircle, Info } from 'lucide-react'

const VehicleInfo = () => {
  const [odometer] = useState(87542)
  const [tripA, setTripA] = useState(234.7)
  const [tripB, setTripB] = useState(1456.2)
  const [avgMPG] = useState(52.3)
  const [instantMPG, setInstantMPG] = useState(48.5)
  const [batteryHealth] = useState(94)
  const [hybridBatteryTemp, setHybridBatteryTemp] = useState(78)
  const [engineHours] = useState(2847)
  const [electricMiles] = useState(12847)

  const [maintenanceItems] = useState([
    { item: 'Oil Change', due: 'Due in 2,458 miles', status: 'good', dueDate: '2024-09-15' },
    { item: 'Tire Rotation', due: 'Due in 1,234 miles', status: 'good', dueDate: '2024-08-20' },
    { item: 'Brake Inspection', due: 'Due in 8,567 miles', status: 'good', dueDate: '2024-12-10' },
    { item: 'Hybrid Battery Check', due: 'Due in 15,432 miles', status: 'good', dueDate: '2025-03-15' },
    { item: 'Air Filter', due: 'Overdue by 234 miles', status: 'warning', dueDate: '2024-06-01' }
  ])

  const [diagnostics] = useState([
    { system: 'Engine', status: 'good', message: 'All systems normal' },
    { system: 'Hybrid Battery', status: 'good', message: 'Battery health excellent' },
    { system: 'Transmission', status: 'good', message: 'CVT operating normally' },
    { system: 'Brakes', status: 'good', message: 'Regenerative braking active' },
    { system: 'Emissions', status: 'good', message: 'All monitors ready' },
    { system: 'Air Filter', status: 'warning', message: 'Filter replacement recommended' }
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setInstantMPG(Math.max(20, Math.min(80, instantMPG + (Math.random() - 0.5) * 5)))
      setHybridBatteryTemp(Math.max(70, Math.min(90, hybridBatteryTemp + (Math.random() - 0.5) * 2)))
    }, 3000)

    return () => clearInterval(interval)
  }, [instantMPG, hybridBatteryTemp])

  const resetTrip = (trip: 'A' | 'B') => {
    if (trip === 'A') {
      setTripA(0)
    } else {
      setTripB(0)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle size={20} color="#00ff88" />
      case 'warning': return <AlertTriangle size={20} color="#ffaa00" />
      case 'error': return <AlertTriangle size={20} color="#ff4444" />
      default: return <Info size={20} color="#00d4ff" />
    }
  }

  return (
    <div className="screen-container">
      <div className="screen-header">
        <Car size={40} color="#00d4ff" />
        <h1 className="screen-title">Vehicle Information</h1>
      </div>

      {/* Vehicle Overview */}
      <div className="card">
        <h3 style={{ marginBottom: '20px', color: '#00d4ff' }}>2010 Toyota Prius Hybrid</h3>
        <div className="grid grid-4">
          <div style={{ textAlign: 'center' }}>
            <div className="metric-value">{odometer.toLocaleString()}</div>
            <div className="metric-label">Total Miles</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="metric-value">{avgMPG}</div>
            <div className="metric-label">Average MPG</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="metric-value">{instantMPG.toFixed(1)}</div>
            <div className="metric-label">Instant MPG</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="metric-value">{engineHours.toLocaleString()}</div>
            <div className="metric-label">Engine Hours</div>
          </div>
        </div>
      </div>

      {/* Trip Computer */}
      <div className="grid grid-2">
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3 style={{ color: '#00d4ff' }}>Trip A</h3>
            <button 
              className="btn btn-secondary"
              onClick={() => resetTrip('A')}
              style={{ fontSize: '12px', padding: '6px 12px' }}
            >
              Reset
            </button>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="metric-value">{tripA.toFixed(1)}</div>
            <div className="metric-label">Miles</div>
          </div>
          <div style={{ marginTop: '15px', fontSize: '14px', color: '#cccccc' }}>
            <div>Average: {(tripA > 0 ? 51.2 : 0).toFixed(1)} MPG</div>
            <div>Time: {Math.floor(tripA / 35)}h {Math.floor((tripA / 35 % 1) * 60)}m</div>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3 style={{ color: '#00d4ff' }}>Trip B</h3>
            <button 
              className="btn btn-secondary"
              onClick={() => resetTrip('B')}
              style={{ fontSize: '12px', padding: '6px 12px' }}
            >
              Reset
            </button>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="metric-value">{tripB.toFixed(1)}</div>
            <div className="metric-label">Miles</div>
          </div>
          <div style={{ marginTop: '15px', fontSize: '14px', color: '#cccccc' }}>
            <div>Average: {(tripB > 0 ? 49.8 : 0).toFixed(1)} MPG</div>
            <div>Time: {Math.floor(tripB / 32)}h {Math.floor((tripB / 32 % 1) * 60)}m</div>
          </div>
        </div>
      </div>

      {/* Hybrid System Details */}
      <div className="card">
        <h3 style={{ marginBottom: '20px', color: '#00d4ff' }}>Hybrid System</h3>
        <div className="grid grid-4">
          <div style={{ textAlign: 'center' }}>
            <Battery size={24} color="#00ff88" style={{ marginBottom: '8px' }} />
            <div className="metric-value">{batteryHealth}%</div>
            <div className="metric-label">Battery Health</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="metric-value">{hybridBatteryTemp}°F</div>
            <div className="metric-label">Battery Temp</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="metric-value">{electricMiles.toLocaleString()}</div>
            <div className="metric-label">Electric Miles</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="metric-value">201.6V</div>
            <div className="metric-label">Battery Voltage</div>
          </div>
        </div>
        
        <div style={{ marginTop: '20px' }}>
          <div style={{ marginBottom: '8px', fontSize: '14px', color: '#cccccc' }}>
            Battery Charge Level
          </div>
          <div style={{ height: '8px', background: 'rgba(255,255,255,0.2)', borderRadius: '4px' }}>
            <div 
              style={{ 
                height: '100%', 
                background: 'linear-gradient(90deg, #00ff88, #00d4ff)', 
                borderRadius: '4px',
                width: `${batteryHealth}%`,
                transition: 'width 0.3s ease',
                boxShadow: '0 0 10px rgba(0,255,136,0.5)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Maintenance Schedule */}
      <div className="card">
        <h3 style={{ marginBottom: '20px', color: '#00d4ff' }}>Maintenance Schedule</h3>
        <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
          {maintenanceItems.map((item, index) => (
            <div 
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 0',
                borderBottom: index < maintenanceItems.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {getStatusIcon(item.status)}
                <div>
                  <div style={{ fontWeight: '600' }}>{item.item}</div>
                  <div style={{ fontSize: '14px', color: '#cccccc' }}>{item.due}</div>
                </div>
              </div>
              <div style={{ fontSize: '12px', color: '#888' }}>
                {item.dueDate}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Diagnostics */}
      <div className="card">
        <h3 style={{ marginBottom: '20px', color: '#00d4ff' }}>System Diagnostics</h3>
        <div className="grid grid-2">
          {diagnostics.map((diagnostic, index) => (
            <div 
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '8px',
                border: `1px solid ${
                  diagnostic.status === 'good' ? 'rgba(0,255,136,0.3)' :
                  diagnostic.status === 'warning' ? 'rgba(255,170,0,0.3)' :
                  'rgba(255,68,68,0.3)'
                }`
              }}
            >
              {getStatusIcon(diagnostic.status)}
              <div>
                <div style={{ fontWeight: '600' }}>{diagnostic.system}</div>
                <div style={{ fontSize: '12px', color: '#cccccc' }}>{diagnostic.message}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 style={{ marginBottom: '15px', color: '#00d4ff' }}>Vehicle Actions</h3>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <button className="btn">
            <Wrench size={16} style={{ marginRight: '8px' }} />
            Service History
          </button>
          <button className="btn btn-secondary">
            <Gauge size={16} style={{ marginRight: '8px' }} />
            Run Diagnostics
          </button>
          <button className="btn btn-secondary">
            <Battery size={16} style={{ marginRight: '8px' }} />
            Battery Report
          </button>
          <button className="btn btn-secondary">
            <Fuel size={16} style={{ marginRight: '8px' }} />
            Fuel Economy
          </button>
        </div>
      </div>
    </div>
  )
}

export default VehicleInfo