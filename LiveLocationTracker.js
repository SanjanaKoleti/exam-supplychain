import { useEffect } from "react";
import L from "leaflet";

const LiveLocationTracker = () => {
  useEffect(() => {
    const existingMap = L.DomUtil.get('map');

    if (existingMap !== null) {
      existingMap._leaflet_id = null; // 💡 clear previous map instance ID
    }

    const destLat = parseFloat(localStorage.getItem("destination_lat"));
    const destLng = parseFloat(localStorage.getItem("destination_lng"));

    if (!destLat || !destLng) {
      alert("Destination not set.");
      return;
    }

    const map = L.map("map").setView([destLat, destLng], 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
    }).addTo(map);

    const destMarker = L.marker([destLat, destLng]).addTo(map)
      .bindPopup("🎯 Destination Center").openPopup();

    let userMarker;

    const updateLocation = (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      if (!userMarker) {
        userMarker = L.marker([lat, lng], {
          icon: L.icon({
            iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            iconSize: [30, 30],
          }),
        }).addTo(map).bindPopup("📍 Your Location").openPopup();
      } else {
        userMarker.setLatLng([lat, lng]);
      }

      map.setView([lat, lng]);
    };

    const errorHandler = (err) => {
      alert("❌ Unable to access location.");
    };

    navigator.geolocation.watchPosition(updateLocation, errorHandler, {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 5000,
    });
  }, []);

  return <div id="map" style={{ height: "100vh", width: "100%" }} />;
};

export default LiveLocationTracker;
