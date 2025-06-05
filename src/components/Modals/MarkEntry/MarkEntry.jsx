import { useEffect, useState, useRef } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  Polyline,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import { MdClose } from 'react-icons/md';
import './MarkEntry.css';

const classLocation = { lat: 6.5244, lng: 3.3792 }; // Example: Lagos

const classIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [30, 40],
  iconAnchor: [15, 40],
  popupAnchor: [0, -40],
});
const userIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149060.png',
  iconSize: [30, 40],
  iconAnchor: [15, 40],
  popupAnchor: [0, -40],
});

function GoToMyLocationButton({ onLocationFound }) {
  const map = useMap();

  const handleClick = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        map.flyTo([coords.lat, coords.lng], 16, { duration: 2 });
        onLocationFound(coords);
      },
      (err) => {
        alert(`Unable to retrieve your location: ${err.message}`);
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <button
      className="goto-location-button"
      onClick={handleClick}
      title="Go to My Location"
      style={{ position: 'absolute', top: 10, right: 10, zIndex: 1000 }}>
      📍 Go to My Location
    </button>
  );
}

const MarkEntry = ({ onClose }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const maxDistance = 50;
  const [status, setStatus] = useState('idle');
  const [userAddress, setUserAddress] = useState(null);
  const [classAddress, setClassAddress] = useState(null);
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const watchId = useRef(null);

  const reverseGeocode = async ({ lat, lng }) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();
      return data.display_name || 'Unknown location';
    } catch {
      return 'Unable to fetch address';
    }
  };

  useEffect(() => {
    reverseGeocode(classLocation).then(setClassAddress);
  }, []);

  useEffect(() => {
    if (userLocation) {
      setLoadingAddress(true);
      reverseGeocode(userLocation).then((addr) => {
        setUserAddress(addr);
        setLoadingAddress(false);
      });
    }
  }, [userLocation]);

  useEffect(() => {
    if (status === 'checking') {
      if (!navigator.geolocation) {
        setErrorMessage('Geolocation is not supported by your browser.');
        setStatus('error');
        return;
      }

      watchId.current = navigator.geolocation.watchPosition(
        (pos) => {
          const coords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setUserLocation(coords);

          const dist = calculateDistance(coords, classLocation);
          setDistance(dist);

          setStatus(dist <= maxDistance ? 'within' : 'far');
          setErrorMessage('');
        },
        (err) => {
          console.error('Geolocation error:', err);
          if (err.code === err.PERMISSION_DENIED) {
            setErrorMessage('Permission denied. Please allow location access.');
          } else if (err.code === err.POSITION_UNAVAILABLE) {
            setErrorMessage('Position unavailable. Try again later.');
          } else if (err.code === err.TIMEOUT) {
            setErrorMessage('Location request timed out.');
          } else {
            setErrorMessage('Unable to retrieve location.');
          }
          setStatus('error');
        },
        {
          enableHighAccuracy: false,
          maximumAge: 5000,
          timeout: 10000,
        }
      );
    } else {
      if (watchId.current !== null) {
        navigator.geolocation.clearWatch(watchId.current);
        watchId.current = null;
      }
    }

    return () => {
      if (watchId.current !== null) {
        navigator.geolocation.clearWatch(watchId.current);
      }
    };
  }, [status]);

  const calculateDistance = (loc1, loc2) => {
    const R = 6371e3;
    const toRad = (deg) => (deg * Math.PI) / 180;
    const dLat = toRad(loc2.lat - loc1.lat);
    const dLng = toRad(loc2.lng - loc1.lng);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(loc1.lat)) *
        Math.cos(toRad(loc2.lat)) *
        Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'idle':
        return 'Click "Check Location" to start tracking your position.';
      case 'checking':
        return 'Tracking your location... Move around to update.';
      case 'within':
        return '✅ You are within the allowed distance.';
      case 'far':
        return '❌ You are too far from the class location.';
      case 'error':
        return `⚠️ ${
          errorMessage || 'Unable to access or track your location.'
        }`;
      default:
        return '';
    }
  };

  return (
    <div className="mark-entry-modal">
      <div className="modal-header">
        <h2>Mark Entry</h2>
        <button
          onClick={() => onClose(false)}
          className="close-button"
          title="Close modal">
          <MdClose />
        </button>
      </div>

      <hr />

      <div className="modal-section">
        <p>
          <strong>Class Location:</strong>{' '}
          {classAddress ?? 'Loading address...'}
        </p>
        {userLocation && (
          <p>
            <strong>Your Location:</strong>{' '}
            {loadingAddress ? 'Loading address...' : userAddress || 'Unknown'}
          </p>
        )}
        <p>
          <strong>Distance:</strong>{' '}
          {distance != null ? `${distance} meters` : 'Not measured'}
        </p>
        <p>
          <strong>Max Allowed:</strong> {maxDistance} meters
        </p>
      </div>

      <div
        className="map-container"
        style={{ position: 'relative' }}>
        <MapContainer
          center={userLocation || classLocation}
          zoom={15}
          scrollWheelZoom={false}
          style={{ height: '300px', width: '100%' }}>
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={classLocation}
            icon={classIcon}>
            <Popup>Class Location</Popup>
          </Marker>
          {userLocation && (
            <>
              <Marker
                position={userLocation}
                icon={userIcon}>
                <Popup>Your Location</Popup>
              </Marker>
              <Circle
                center={userLocation}
                radius={maxDistance}
                pathOptions={{
                  color: status === 'within' ? 'green' : 'red',
                  fillColor:
                    status === 'within'
                      ? 'rgba(0,255,0,0.2)'
                      : 'rgba(255,0,0,0.2)',
                }}
              />
              <Polyline
                positions={[userLocation, classLocation]}
                pathOptions={{ color: 'blue', weight: 4, opacity: 0.7 }}
              />
            </>
          )}
          <GoToMyLocationButton onLocationFound={setUserLocation} />
        </MapContainer>
      </div>

      <div className="info-box">{getStatusMessage()}</div>

      <button
        className="check-button"
        onClick={() => setStatus(status === 'checking' ? 'idle' : 'checking')}>
        {status === 'checking' ? 'Stop Tracking' : 'Check Location'}
      </button>
    </div>
  );
};

export default MarkEntry;
