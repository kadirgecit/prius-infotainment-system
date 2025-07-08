import { useState, useEffect } from 'react'
import { Music, Play, Pause, SkipBack, SkipForward, Volume2, Radio, Bluetooth, Usb } from 'lucide-react'

interface Track {
  id: number
  title: string
  artist: string
  album: string
  duration: string
  currentTime: string
}

const MediaPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(65)
  const [currentSource, setCurrentSource] = useState<'bluetooth' | 'usb' | 'radio'>('bluetooth')
  const [currentTrack, setCurrentTrack] = useState<Track>({
    id: 1,
    title: "Hybrid Dreams",
    artist: "Electric Avenue",
    album: "Green Energy",
    duration: "3:42",
    currentTime: "1:23"
  })
  
  const [playlist] = useState<Track[]>([
    { id: 1, title: "Hybrid Dreams", artist: "Electric Avenue", album: "Green Energy", duration: "3:42", currentTime: "0:00" },
    { id: 2, title: "Silent Running", artist: "Eco Warriors", album: "Clean Drive", duration: "4:15", currentTime: "0:00" },
    { id: 3, title: "Battery Life", artist: "Future Sound", album: "Sustainable Beats", duration: "3:28", currentTime: "0:00" },
    { id: 4, title: "Zero Emissions", artist: "Green Machine", album: "Planet Earth", duration: "4:01", currentTime: "0:00" },
    { id: 5, title: "Regenerative", artist: "Power Source", album: "Energy Flow", duration: "3:55", currentTime: "0:00" }
  ])

  const [radioStations] = useState([
    { freq: "101.5", name: "Classic Rock FM", genre: "Rock" },
    { freq: "95.7", name: "Jazz Lounge", genre: "Jazz" },
    { freq: "103.2", name: "Pop Hits", genre: "Pop" },
    { freq: "88.9", name: "NPR News", genre: "News" },
    { freq: "106.1", name: "Electronic Beats", genre: "Electronic" }
  ])

  const [currentStation, setCurrentStation] = useState(radioStations[0])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying && currentSource !== 'radio') {
      interval = setInterval(() => {
        // Simulate track progress
        const [minutes, seconds] = currentTrack.currentTime.split(':').map(Number)
        const totalSeconds = minutes * 60 + seconds + 1
        const newMinutes = Math.floor(totalSeconds / 60)
        const newSeconds = totalSeconds % 60
        
        setCurrentTrack(prev => ({
          ...prev,
          currentTime: `${newMinutes}:${newSeconds.toString().padStart(2, '0')}`
        }))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentTrack.currentTime, currentSource])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const nextTrack = () => {
    const currentIndex = playlist.findIndex(track => track.id === currentTrack.id)
    const nextIndex = (currentIndex + 1) % playlist.length
    setCurrentTrack({ ...playlist[nextIndex], currentTime: "0:00" })
  }

  const previousTrack = () => {
    const currentIndex = playlist.findIndex(track => track.id === currentTrack.id)
    const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1
    setCurrentTrack({ ...playlist[prevIndex], currentTime: "0:00" })
  }

  const selectTrack = (track: Track) => {
    setCurrentTrack({ ...track, currentTime: "0:00" })
    setCurrentSource('bluetooth')
    setIsPlaying(true)
  }

  const selectStation = (station: any) => {
    setCurrentStation(station)
    setCurrentSource('radio')
    setIsPlaying(true)
  }

  return (
    <div className="screen-container">
      <div className="screen-header">
        <Music size={40} color="#00d4ff" />
        <h1 className="screen-title">Media Player</h1>
      </div>

      {/* Source Selection */}
      <div className="card">
        <h3 style={{ marginBottom: '15px', color: '#00d4ff' }}>Audio Source</h3>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button 
            className={`btn ${currentSource === 'bluetooth' ? '' : 'btn-secondary'}`}
            onClick={() => setCurrentSource('bluetooth')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Bluetooth size={16} />
            Bluetooth
          </button>
          <button 
            className={`btn ${currentSource === 'usb' ? '' : 'btn-secondary'}`}
            onClick={() => setCurrentSource('usb')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Usb size={16} />
            USB
          </button>
          <button 
            className={`btn ${currentSource === 'radio' ? '' : 'btn-secondary'}`}
            onClick={() => setCurrentSource('radio')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Radio size={16} />
            Radio
          </button>
        </div>
      </div>

      {/* Now Playing */}
      <div className="card">
        <h3 style={{ marginBottom: '20px', color: '#00d4ff' }}>Now Playing</h3>
        
        {currentSource === 'radio' ? (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div className="metric-value" style={{ fontSize: '36px' }}>{currentStation.freq}</div>
              <div className="metric-label">{currentStation.name}</div>
              <div style={{ color: '#cccccc', marginTop: '5px' }}>{currentStation.genre}</div>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div className="metric-value" style={{ fontSize: '24px', marginBottom: '8px' }}>
                {currentTrack.title}
              </div>
              <div style={{ fontSize: '18px', color: '#cccccc', marginBottom: '4px' }}>
                {currentTrack.artist}
              </div>
              <div style={{ fontSize: '16px', color: '#888' }}>
                {currentTrack.album}
              </div>
            </div>

            {/* Progress Bar */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: '#cccccc' }}>
                <span>{currentTrack.currentTime}</span>
                <span>{currentTrack.duration}</span>
              </div>
              <div style={{ height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px' }}>
                <div 
                  style={{ 
                    height: '100%', 
                    background: 'linear-gradient(90deg, #00d4ff, #00ff88)', 
                    borderRadius: '2px',
                    width: '35%',
                    transition: 'width 0.3s ease'
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Media Controls */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
          <button 
            className="btn btn-secondary" 
            onClick={previousTrack}
            style={{ padding: '12px', borderRadius: '50%' }}
            disabled={currentSource === 'radio'}
          >
            <SkipBack size={20} />
          </button>
          
          <button 
            className="btn" 
            onClick={togglePlayPause}
            style={{ padding: '16px', borderRadius: '50%', fontSize: '20px' }}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          
          <button 
            className="btn btn-secondary" 
            onClick={nextTrack}
            style={{ padding: '12px', borderRadius: '50%' }}
            disabled={currentSource === 'radio'}
          >
            <SkipForward size={20} />
          </button>
        </div>

        {/* Volume Control */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Volume2 size={20} color="#00d4ff" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            style={{
              flex: 1,
              height: '6px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '3px',
              outline: 'none',
              cursor: 'pointer'
            }}
          />
          <span style={{ minWidth: '40px', textAlign: 'right' }}>{volume}%</span>
        </div>
      </div>

      {/* Content based on source */}
      {currentSource === 'radio' ? (
        <div className="card">
          <h3 style={{ marginBottom: '20px', color: '#00d4ff' }}>Radio Stations</h3>
          <div className="grid grid-2">
            {radioStations.map((station, index) => (
              <div 
                key={index}
                onClick={() => selectStation(station)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '15px',
                  background: currentStation.freq === station.freq ? 'rgba(0,212,255,0.2)' : 'rgba(255,255,255,0.05)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: currentStation.freq === station.freq ? '1px solid #00d4ff' : '1px solid rgba(255,255,255,0.1)'
                }}
                onMouseEnter={(e) => {
                  if (currentStation.freq !== station.freq) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentStation.freq !== station.freq) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                  }
                }}
              >
                <div>
                  <div style={{ fontWeight: '600', fontSize: '18px' }}>{station.freq}</div>
                  <div style={{ fontSize: '14px', color: '#cccccc' }}>{station.name}</div>
                </div>
                <div style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase' }}>
                  {station.genre}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="card">
          <h3 style={{ marginBottom: '20px', color: '#00d4ff' }}>Playlist</h3>
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {playlist.map((track, index) => (
              <div 
                key={track.id}
                onClick={() => selectTrack(track)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 15px',
                  background: currentTrack.id === track.id ? 'rgba(0,212,255,0.2)' : 'transparent',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: currentTrack.id === track.id ? '1px solid #00d4ff' : '1px solid transparent',
                  marginBottom: '8px'
                }}
                onMouseEnter={(e) => {
                  if (currentTrack.id !== track.id) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentTrack.id !== track.id) {
                    e.currentTarget.style.background = 'transparent'
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ 
                    width: '30px', 
                    height: '30px', 
                    background: 'rgba(0,212,255,0.2)', 
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    {index + 1}
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '2px' }}>{track.title}</div>
                    <div style={{ fontSize: '14px', color: '#cccccc' }}>{track.artist}</div>
                  </div>
                </div>
                <div style={{ fontSize: '14px', color: '#888' }}>
                  {track.duration}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MediaPlayer