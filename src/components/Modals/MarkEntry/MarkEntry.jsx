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
import { markGeoEntry } from '../../../services/attendance.service';
import { toast } from 'react-toastify';
import useDisableScroll from '../../../hooks/useDisableScroll';
import { useErrorModal } from '../../../hooks/useErrorModal';
import { FiLoader } from 'react-icons/fi';

// const classLocation = { lat: 6.669956, lng: 3.310279 };
// const classLocation = { lat: 6.4488, lng: 3.39111 };
// const classLocation = { lat: 6.4488, lng: 3.39111 };

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
      📍 My Location
    </button>
  );
}
// const maxDistance = 100000;

const MarkEntry = ({
  onClose,
  visible,
  maxDistance = 10,
  attendanceId,
  mode,
  classLocation = { lat: 0, lng: 0 },
}) => {
  useDisableScroll(visible);

  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [status, setStatus] = useState('idle');
  const [userAddress, setUserAddress] = useState(null);
  const [classAddress, setClassAddress] = useState(null);
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const watchId = useRef(null);

  const { open: openError } = useErrorModal();

  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [visible]);

  const reverseGeocode = async ({ lat, lng }) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );
      if (!res.ok) throw new Error('Failed to fetch');
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
        setErrorMessage('Geolocation not supported.');
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
          const messages = {
            1: 'Permission denied. Please allow location access.',
            2: 'Position unavailable. Try again later.',
            3: 'Request timed out. Try again.',
          };
          setErrorMessage(messages[err.code] || 'Geolocation error.');
          setStatus('error');
        },
        {
          enableHighAccuracy: true,
          maximumAge: 5000,
          timeout: 15000,
        }
      );
    } else {
      if (watchId.current) {
        navigator.geolocation.clearWatch(watchId.current);
        watchId.current = null;
      }
    }

    return () => {
      if (watchId.current) {
        navigator.geolocation.clearWatch(watchId.current);
      }
    };
  }, [status]);

  const calculateDistance = (loc1, loc2) => {
    const R = 6371e3;
    const φ1 = (loc1.lat * Math.PI) / 180;
    const φ2 = (loc2.lat * Math.PI) / 180;
    const Δφ = ((loc2.lat - loc1.lat) * Math.PI) / 180;
    const Δλ = ((loc2.lng - loc1.lng) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) ** 2 +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'idle':
        return '📍 Click "Check Location" to start tracking.';
      case 'checking':
        return '🛰️ Tracking your location...';
      case 'within':
        return '✅ You are within range.';
      case 'far':
        return '❌ You are too far from class location.';
      case 'error':
        return `⚠️ ${errorMessage || 'Tracking error.'}`;
      default:
        return '';
    }
  };

  const [loading, setLoading] = useState(false);

  const submitCheckIn = async () => {
    if (!userLocation) return alert('Location not available.');
    if (status !== 'within') return alert('You are not within range.');
    if (!attendanceId) return alert('No attendance session provided.');

    setLoading(true);

    try {
      const res = await markGeoEntry(attendanceId, userLocation, mode);
      if (res.success) toast.success(res.message || 'Marked successfully!');
      onClose({
        visible: false,
        maxRange: 0,
        attendanceId: '',
        mode: '',
      });
    } catch (err) {
      openError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mark-entry-modal-wrapper">
      <div className="mark-entry-modal">
        <div className="modal-header">
          <h2>Mark Entry</h2>
          <button
            onClick={() =>
              onClose((p) => ({
                ...p,
                visible: false,
              }))
            }
            className="close-button"
            title="Close modal">
            <MdClose />
          </button>
        </div>
        <div className="modal-section">
          <p>
            <strong>Class Location:</strong> {classAddress || 'Loading...'}
          </p>
          {userLocation && (
            <p>
              <strong>Your Location:</strong>{' '}
              {loadingAddress ? 'Loading...' : userAddress || 'Unknown'}
            </p>
          )}
          <p>
            <strong>Distance:</strong>{' '}
            {distance != null ? `${distance} m` : 'Not measured'}
          </p>
          <p>
            <strong>Allowed Range:</strong> {maxDistance} meters
          </p>
        </div>
        <div
          className="map-container"
          style={{ position: 'relative' }}>
          <MapContainer
            center={userLocation || classLocation}
            zoom={15}
            scrollWheelZoom={false}
            style={{ height: '300px', width: '100%', borderRadius: '8px' }}>
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
                  pathOptions={{ color: 'blue', weight: 3, opacity: 0.6 }}
                />
              </>
            )}
            <GoToMyLocationButton onLocationFound={setUserLocation} />
          </MapContainer>
        </div>
        <div className={`info-box ${status}`}>{getStatusMessage()}</div>
        <div className="mark-entry-cta">
          <button
            className="check-button"
            onClick={() =>
              setStatus((prev) => (prev === 'checking' ? 'idle' : 'checking'))
            }>
            {status === 'checking' ? 'Stop Tracking' : 'Check Location'}
          </button>
          {status === 'within' && (
            <button
              className="submit-button"
              onClick={submitCheckIn}
              style={{ marginTop: '10px' }}>
              {loading && <FiLoader className="spin" />}
              Submit {mode}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarkEntry;
