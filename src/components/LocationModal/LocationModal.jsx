import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import debounce from 'lodash.debounce';
import opencage from 'opencage-api-client';
import { useFormContext } from 'react-hook-form';
import { MdLocationOn, MdClose, MdMyLocation } from 'react-icons/md';
import { SiGooglemaps } from 'react-icons/si';
import styles from './LocationModal.module.css';
import 'leaflet/dist/leaflet.css';
import Spinner from '../Loader/Spinner/Spinner';
import useDisableScroll from '../../hooks/useDisableScroll';

const MAPTILER_KEY = 'UiLUZZn6H09248QORsMi';
const OPENCAGE_KEY = '33cd4434fe0d4c85aa44df03da8a1816';
const NIGERIA_CENTER = [8.5, 8.0];
const NIGERIA_BOUNDS = [
  [4.2721, 2.6769],
  [13.8856, 14.6776],
];

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const popularCampuses = [
  {
    lat: 8.71648175046602,
    lng: 4.472258314334901,
    name: 'Kwara State University (KWASU)',
  },
  {
    name: 'University of Ilorin (UNILORIN)',
    lat: 8.4859168,
    lng: 4.6643047,
  },
  {
    name: 'Offa Polytechnic',
    lat: 8.1321567,
    lng: 4.7008239,
  },
];

const LocationPickerMap = ({ initialValue, onConfirm }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [pos, setPos] = useState(
    initialValue && initialValue.coordinates?.length === 2
      ? { lat: initialValue.coordinates[1], lng: initialValue.coordinates[0] }
      : null
  );
  const [label, setLabel] = useState(initialValue?.label || '');
  const [flyTo, setFlyTo] = useState(null);
  const markerRef = useRef(null);

  const debouncedSearch = useRef(
    debounce(async (q) => {
      if (!q) return setResults([]);
      setLoading(true);
      try {
        const res = await opencage.geocode({
          q,
          key: OPENCAGE_KEY,
          countrycode: 'ng',
          limit: 5,
        });
        setResults(res.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 400)
  ).current;

  useEffect(() => {
    debouncedSearch(query);
  }, [query]);

  const commitSelection = (addr, { lat, lng }) => {
    setLabel(addr);
    setPos({ lat, lng });
    setFlyTo({ lat, lng });
  };

  const reverseGeocode = async (lat, lng) => {
    try {
      const res = await opencage.geocode({
        q: `${lat},${lng}`,
        key: OPENCAGE_KEY,
        language: 'en',
      });
      const address = res.results?.[0]?.formatted || 'Pinned on map';
      commitSelection(address, { lat, lng });
    } catch (err) {
      console.error('Reverse error', err);
      commitSelection('Pinned on map', { lat, lng });
    }
  };

  const MapClick = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        reverseGeocode(lat, lng);
      },
    });
    return null;
  };

  const MapController = ({ flyTo }) => {
    const map = useMapEvents({});
    useEffect(() => {
      if (flyTo) {
        map.flyTo([flyTo.lat, flyTo.lng], 16, { duration: 1.2 });
      }
    }, [flyTo]);
    return null;
  };

  const selectResult = (r) => {
    commitSelection(r.formatted, {
      lat: +r.geometry.lat,
      lng: +r.geometry.lng,
    });
    setResults([]);
  };

  const handleCampus = (c) => {
    commitSelection(c.name, { lat: c.lat, lng: c.lng });
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) return alert('Geolocation not supported');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        reverseGeocode(latitude, longitude);
      },
      () => alert('Unable to retrieve location')
    );
  };

  return (
    <div className={styles.mapWrapper}>
      <div className={styles.searchRow}>
        <input
          className={styles.searchInput}
          placeholder="Search Nigerian locations…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className={styles.geoBtn}
          onClick={handleUseMyLocation}
          title="Use my location">
          <MdMyLocation />
        </button>
      </div>
      {loading && (
        <div className={styles.spinnerBox}>
          <Spinner size={20} />
        </div>
      )}
      {!loading && results.length > 0 && (
        <ul className={styles.resultsList}>
          {results.map((r, i) => (
            <li
              key={i}
              onClick={() => selectResult(r)}>
              {r.formatted}
            </li>
          ))}
        </ul>
      )}

      <div className={styles.popularRow}>
        {popularCampuses.map((c) => (
          <button
            key={c.name}
            className={styles.chip}
            onClick={() => handleCampus(c)}>
            {c.name}
          </button>
        ))}
      </div>

      <MapContainer
        center={pos ? [pos.lat, pos.lng] : NIGERIA_CENTER}
        zoom={pos ? 7 : 6}
        maxBounds={NIGERIA_BOUNDS}
        maxBoundsViscosity={1}
        style={{ height: 300, width: '100%', marginTop: 10 }}>
        <TileLayer
          url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
          attribution="© OpenStreetMap contributors"
        />

        <MapClick />
        <MapController flyTo={flyTo} />
        {pos && (
          <Marker
            draggable
            position={[pos.lat, pos.lng]}
            ref={markerRef}
            eventHandlers={{
              dragend: () => {
                const m = markerRef.current;
                if (!m) return;
                const { lat, lng } = m.getLatLng();
                reverseGeocode(lat, lng);
              },
            }}
          />
        )}
      </MapContainer>

      <div className={styles.actionRow}>
        <button
          className={styles.confirmBtn}
          disabled={!pos}
          onClick={() =>
            onConfirm({
              label,
              coordinates: pos ? [pos.lng, pos.lat] : undefined,
            })
          }>
          Set Location
        </button>
      </div>
    </div>
  );
};

const LocationModal = ({ fieldName }) => {
  const [linkMode, setLinkMode] = useState(false);
  const [mapLink, setMapLink] = useState('');
  const [linkError, setLinkError] = useState('');

  const { setValue, watch } = useFormContext();
  const selected = watch(fieldName);
  const [open, setOpen] = useState(false);

  const handleConfirm = (data) => {
    const lng = data.coordinates[0];
    const lat = data.coordinates[1];
    const location = { lat, lng };
    setValue(fieldName, location, { shouldValidate: true });
    setOpen(false);
    console.log(data);
    console.log(selected);
  };

  const extractLatLngFromGoogleMapsUrl = (url) => {
    try {
      const preciseMatch = url.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
      if (preciseMatch) {
        return {
          lat: parseFloat(preciseMatch[1]),
          lng: parseFloat(preciseMatch[2]),
        };
      }

      const fallbackMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
      if (fallbackMatch) {
        return {
          lat: parseFloat(fallbackMatch[1]),
          lng: parseFloat(fallbackMatch[2]),
        };
      }

      return null;
    } catch {
      return null;
    }
  };

  const [previewCoords, setPreviewCoords] = useState(null);

  const handleLinkSubmit = async () => {
    setLinkError('');
    const coords = extractLatLngFromGoogleMapsUrl(mapLink.trim());
    if (!coords) {
      setLinkError('Could not extract coordinates from the link.');
      return;
    }

    try {
      const res = await opencage.geocode({
        q: `${coords.lat},${coords.lng}`,
        key: OPENCAGE_KEY,
        language: 'en',
      });
      const label = res.results?.[0]?.formatted || 'Selected via Google Maps';
      handleConfirm({ label, coordinates: [coords.lng, coords.lat] });
      setLinkMode(false);
      setMapLink('');
    } catch (err) {
      console.error(err);
      setLinkError('Reverse geocoding failed.');
    }
  };

  useEffect(() => {
    if (!mapLink) {
      setLinkError('');
      setPreviewCoords(null);
      return;
    }
    const coords = extractLatLngFromGoogleMapsUrl(mapLink);
    if (coords) {
      setLinkError('');
      setPreviewCoords(coords);
    } else {
      setLinkError(
        'Invalid link. Make sure it contains latitude and longitude like "@8.72,4.48".'
      );
      setPreviewCoords(null);
    }
  }, [mapLink]);

  useDisableScroll(open);
  useDisableScroll(linkMode);

  return (
    <>
      <div className={styles.cta}>
        <button
          type="button"
          className={styles.triggerBtn}
          onClick={() => setOpen(true)}>
          <MdLocationOn /> {selected?.label ? 'Change' : 'Pick'}
        </button>
        <button
          type="button"
          className={styles.triggerBtn}
          onClick={() => setLinkMode(true)}>
          <SiGooglemaps />
          Use Maps Link
        </button>
      </div>

      {open &&
        createPortal(
          <div
            className={styles.modalBackdrop}
            onClick={() => setOpen(false)}>
            <div
              className={styles.modalBox}
              onClick={(e) => e.stopPropagation()}>
              <header className={styles.modalHeader}>
                <h2>Select Class Location</h2>
                <MdClose
                  onClick={() => setOpen(false)}
                  className={styles.closeIcon}
                />
              </header>
              <LocationPickerMap
                initialValue={selected}
                onConfirm={handleConfirm}
              />
            </div>
          </div>,
          document.body
        )}

      {linkMode &&
        createPortal(
          <div
            className={styles.modalBackdrop}
            onClick={() => setLinkMode(false)}>
            <div
              className={styles.modalBox}
              onClick={(e) => e.stopPropagation()}>
              <header className={styles.modalHeader}>
                <h2>Paste Google Maps Link</h2>
                <MdClose
                  onClick={() => setLinkMode(false)}
                  className={styles.closeIcon}
                />
              </header>

              <div className={styles.linkForm}>
                <p className={styles.instructions}>
                  📍 Go to <strong>Google Maps</strong>, search for your desired
                  location (e.g., classroom, department block), then: Paste the
                  link below to automatically extract the location coordinates
                  (latitude & longitude).
                </p>

                <p className={styles.info}>
                  ⚠️ Please{' '}
                  <strong>
                    copy the full link from your browser's address bar
                  </strong>
                  , not from the share menu. Example:
                  <code>
                    https://www.google.com/maps/place/E-Library/@8.7190274,4.4840562,...
                  </code>
                </p>

                <input
                  type="text"
                  placeholder="Paste Google Maps link here"
                  value={mapLink}
                  onChange={(e) => setMapLink(e.target.value)}
                  className={styles.searchInput}
                />

                {linkError && <p className={styles.errorText}>{linkError}</p>}

                {previewCoords && (
                  <div className={styles.previewBox}>
                    <iframe
                      src={`https://maps.google.com/maps?q=${previewCoords.lat},${previewCoords.lng}&z=17&output=embed`}
                      width="100%"
                      height="200"
                      style={{ borderRadius: '10px' }}
                      allowFullScreen
                      loading="lazy"
                    />
                    <p className={styles.previewCoords}>
                      📍 Latitude: <strong>{previewCoords.lat}</strong>,
                      Longitude: <strong>{previewCoords.lng}</strong>
                    </p>
                  </div>
                )}

                <div className={styles.actionRow}>
                  <button
                    onClick={handleLinkSubmit}
                    className={styles.confirmBtn}
                    disabled={!previewCoords}>
                    Use This Location
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default LocationModal;
