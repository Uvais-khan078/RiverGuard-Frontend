import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function BiodiversityLegend() {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const legend = L.control({ position: "bottomright" });

    legend.onAdd = function () {
      const div = L.DomUtil.create("div", "info legend");
      const levels = ["High", "Medium", "Low"];
      const colors = ["green", "yellow", "red"];

      for (let i = 0; i < levels.length; i++) {
        div.innerHTML +=
          '<i style="background:' + colors[i] + '; width:18px; height:18px; float:left; margin-right:8px; opacity:0.8; border-radius:50%; border:1px solid #333;"></i> ' +
          levels[i] +
          "<br>";
      }
      return div;
    };

    legend.addTo(map);

    return () => {
      legend.remove();
    };
  }, [map]);

  return null;
}

function Map() {
  const navigate = useNavigate();
  const [clearance, setClearance] = useState(1); // default to 1
  const [fullScreenSatellite, setFullScreenSatellite] = useState(false);
  const [fullScreenPollution, setFullScreenPollution] = useState(false);
  const [fullScreenBiodiversity, setFullScreenBiodiversity] = useState(false);

  // Pollution heatmap city data
  const cities = [
    { name: "Uttarkashi", zone: "Green", lat: 30.7298, lon: 78.4359 },
    { name: "Tehri Garhwal", zone: "Yellow", lat: 30.3794, lon: 78.5661 },
    { name: "Pauri Garhwal", zone: "Yellow", lat: 30.15, lon: 78.7833 },
    { name: "Haridwar", zone: "Yellow", lat: 29.9457, lon: 78.1642 },
    { name: "Bijnor", zone: "Yellow", lat: 29.3724, lon: 78.1368 },
    { name: "Bulandshahr", zone: "Yellow", lat: 28.4089, lon: 77.8498 },
    { name: "Aligarh", zone: "Yellow", lat: 27.8974, lon: 78.088 },
    { name: "Kasganj", zone: "Yellow", lat: 27.7982, lon: 78.6451 },
    { name: "Sambhal", zone: "Yellow", lat: 28.5854, lon: 78.5667 },
    { name: "Amroha", zone: "Yellow", lat: 28.9031, lon: 78.4629 },
    { name: "Hapur", zone: "Yellow", lat: 28.7434, lon: 77.7652 },
    { name: "Meerut", zone: "Yellow", lat: 28.9845, lon: 77.7064 },
    { name: "Muzaffarnagar", zone: "Yellow", lat: 29.4739, lon: 77.7041 },
    { name: "Budaun", zone: "Yellow", lat: 28.0352, lon: 79.1266 },
    { name: "Shahjahanpur", zone: "Yellow", lat: 27.8814, lon: 79.9109 },
    { name: "Farrukhabad", zone: "Yellow", lat: 27.3906, lon: 79.5782 },
    { name: "Kannauj", zone: "Yellow", lat: 27.0558, lon: 79.9187 },
    { name: "Kanpur Nagar", zone: "Green", lat: 26.4499, lon: 80.3319 },
    { name: "Kanpur Dehat", zone: "Yellow", lat: 26.4167, lon: 79.9167 },
    { name: "Unnao", zone: "Yellow", lat: 26.5477, lon: 80.4878 },
    { name: "Raebareli", zone: "Yellow", lat: 26.2303, lon: 81.231 },
    { name: "Fatehpur", zone: "Yellow", lat: 25.9277, lon: 80.8128 },
    { name: "Kaushambi", zone: "Green", lat: 25.3387, lon: 81.3761 },
    { name: "Prayagraj", zone: "Yellow", lat: 25.4358, lon: 81.8463 },
    { name: "Pratapgarh", zone: "Yellow", lat: 25.9124, lon: 81.9454 },
    { name: "Mirzapur", zone: "Green", lat: 25.1449, lon: 82.5653 },
    { name: "Sant Ravidas Nagar", zone: "Yellow", lat: 25.394, lon: 82.5709 },
    { name: "Varanasi", zone: "Yellow", lat: 25.3176, lon: 82.9739 },
    { name: "Chandauli", zone: "Yellow", lat: 25.2682, lon: 83.2707 },
    { name: "Ghazipur", zone: "Yellow", lat: 25.5797, lon: 83.5806 },
    { name: "Ballia", zone: "Yellow", lat: 25.7586, lon: 84.1492 },
    { name: "Buxar", zone: "Yellow", lat: 25.5647, lon: 83.9787 },
    { name: "Bhojpur", zone: "Yellow", lat: 25.56, lon: 84.3731 },
    { name: "Patna", zone: "Yellow", lat: 25.5941, lon: 85.1376 },
    { name: "Vaishali", zone: "Yellow", lat: 25.695, lon: 85.22 },
    { name: "Saran", zone: "Yellow", lat: 25.9365, lon: 84.8985 },
    { name: "Begusarai", zone: "Yellow", lat: 25.4185, lon: 86.1339 },
    { name: "Lakhisarai", zone: "Yellow", lat: 25.1717, lon: 86.0884 },
    { name: "Munger", zone: "Yellow", lat: 25.381, lon: 86.4744 },
    { name: "Bhagalpur", zone: "Yellow", lat: 25.3476, lon: 86.9824 },
    { name: "Khagaria", zone: "Yellow", lat: 25.5032, lon: 86.4671 },
    { name: "Katihar", zone: "Yellow", lat: 25.5385, lon: 87.5837 },
    { name: "Samastipur", zone: "Yellow", lat: 25.8617, lon: 85.7795 },
    { name: "Saharsa", zone: "Green", lat: 25.8793, lon: 86.6006 },
    { name: "Madhepura", zone: "Yellow", lat: 25.921, lon: 86.7927 },
    { name: "Purnia", zone: "Green", lat: 25.7771, lon: 87.4753 },
    { name: "Araria", zone: "Yellow", lat: 26.1486, lon: 87.4545 },
    { name: "Kishanganj", zone: "Yellow", lat: 26.1025, lon: 87.9373 },
    { name: "Sahibganj", zone: "Yellow", lat: 25.2423, lon: 87.6162 },
    { name: "Murshidabad", zone: "Yellow", lat: 24.181, lon: 88.2716 },
    { name: "Nadia", zone: "Yellow", lat: 23.471, lon: 88.5565 },
    { name: "Hooghly", zone: "Green", lat: 22.9089, lon: 88.3963 },
    { name: "Howrah", zone: "Green", lat: 22.5958, lon: 88.2636 },
    { name: "North 24 Parganas", zone: "Green", lat: 22.7185, lon: 88.4312 },
    { name: "South 24 Parganas", zone: "Green", lat: 22.2692, lon: 88.4316 },
    { name: "Kolkata", zone: "Yellow", lat: 22.5726, lon: 88.3639 },
    { name: "Purba Bardhaman", zone: "Green", lat: 23.2324, lon: 87.8615 },
    { name: "Paschim Bardhaman", zone: "Yellow", lat: 23.6849, lon: 87.745 }
  ];

  const zoneColors = {
    Green: "green",
    Yellow: "gold"
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.clearance) {
      setClearance(parseInt(userData.clearance));
    }
  }, []);

  const handleFactoryRegister = () => {
    if (clearance >= 2) {
      navigate("/adminpage");
    } else {
      alert("Access Denied: You need Level 2 or higher clearance to access this feature.");
    }
  };

  // Handlers to toggle fullscreen, ensuring only one map is fullscreen at a time
  const openSatelliteFullScreen = () => {
    setFullScreenSatellite(true);
    setFullScreenPollution(false);
    setFullScreenBiodiversity(false);
  };

  const closeSatelliteFullScreen = () => {
    setFullScreenSatellite(false);
  };

  const openPollutionFullScreen = () => {
    setFullScreenPollution(true);
    setFullScreenSatellite(false);
    setFullScreenBiodiversity(false);
  };

  const closePollutionFullScreen = () => {
    setFullScreenPollution(false);
  };

  const openBiodiversityFullScreen = () => {
    setFullScreenBiodiversity(true);
    setFullScreenPollution(false);
    setFullScreenSatellite(false);
  };

  const closeBiodiversityFullScreen = () => {
    setFullScreenBiodiversity(false);
  };

  // Biodiversity map data for dot markers
  const gangaZones = [
    {
      name: "Upper Ganga",
      biodiversityLevel: "High",
      points: [
        [30.5, 78.1],
        [30.4, 78.2],
        [30.3, 78.0],
        [30.6, 78.3],
        [30.2, 77.9],
      ],
    },
    {
      name: "Middle Ganga",
      biodiversityLevel: "Medium",
      points: [
        [27.5, 80.1],
        [27.0, 80.3],
        [26.5, 80.0],
        [27.2, 79.8],
        [26.8, 80.5],
      ],
    },
    {
      name: "Lower Ganga",
      biodiversityLevel: "Low",
      points: [
        [22.0, 82.1],
        [21.5, 82.3],
        [21.0, 82.0],
        [21.8, 82.5],
        [21.2, 81.8],
      ],
    },
  ];

  const getBiodiversityColor = (level) => {
    return level === "High" ? "green" : level === "Medium" ? "yellow" : "red";
  };

  return (
    <>
      <section className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Satellite Map View */}
        {!fullScreenPollution && !fullScreenBiodiversity && (
          <div className={`rounded-lg bg-white p-4 shadow relative ${fullScreenSatellite ? "col-span-3" : ""}`}>
            <h3 className="mb-2 text-lg font-semibold">Satellite Map View</h3>
            {!fullScreenSatellite && (
              <>
                <div className="h-64 rounded-lg overflow-hidden">
                  <MapContainer
                    center={[30.9954, 79.0671]} // Gangotri, Uttarakhand
                    zoom={13}
                    scrollWheelZoom={true}
                    className="h-full w-full"
                  >
                    <TileLayer
                      url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                      attribution="Tiles © Esri"
                    />
                    <Marker position={[30.9954, 79.0671]}>
                      <Popup>Gangotri, Uttarakhand</Popup>
                    </Marker>
                  </MapContainer>
                </div>
                <button
                  onClick={openSatelliteFullScreen}
                  className="absolute top-2 right-2 rounded bg-blue-600 px-2 py-1 text-xs text-white hover:bg-blue-700"
                >
                  Fullscreen
                </button>
              </>
            )}
            {fullScreenSatellite && (
              <div className="fixed inset-0 z-50 bg-white">
                <MapContainer
                  center={[30.9954, 79.0671]} // Gangotri, Uttarakhand
                  zoom={13}
                  scrollWheelZoom={true}
                  className="h-full w-full"
                >
                  <TileLayer
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    attribution="Tiles © Esri"
                  />
                  <Marker position={[30.9954, 79.0671]}>
                    <Popup>Gangotri, Uttarakhand</Popup>
                  </Marker>
                </MapContainer>
                <button
                  onClick={closeSatelliteFullScreen}
                  className="fixed top-4 right-4 z-50 rounded bg-red-600 px-4 py-2 text-white"
                  style={{ zIndex: 9999 }}
                >
                  Close Fullscreen
                </button>
              </div>
            )}
          </div>
        )}

        {/* Pollution Heatmap with Fullscreen */}
        {!fullScreenSatellite && !fullScreenBiodiversity && (
          <div className={`rounded-lg bg-white p-4 shadow relative ${fullScreenPollution ? "col-span-3" : ""}`}>
            <h3 className="mb-2 text-lg font-semibold">Pollution Heatmap</h3>
            {!fullScreenPollution && (
              <>
                <div className="h-64 rounded-lg overflow-hidden z">
                  <MapContainer
                    center={[26.8, 83]}
                    zoom={6}
                    scrollWheelZoom={true}
                    className="h-full w-full rounded-md"
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      maxZoom={18}
                      attribution="&copy; OpenStreetMap contributors"
                    />
                    {cities.map((city, idx) => (
                      <CircleMarker
                        key={idx}
                        center={[city.lat, city.lon]}
                        radius={7}
                        pathOptions={{
                          color: zoneColors[city.zone] || "blue",
                          fillColor: zoneColors[city.zone] || "blue",
                          fillOpacity: 0.8,
                        }}
                      >
                        <Popup>
                          <strong>{city.name}</strong>
                          <br />
                          Zone: {city.zone}
                        </Popup>
                      </CircleMarker>
                    ))}
                  </MapContainer>
                </div>
                <button
                  onClick={openPollutionFullScreen}
                  className="absolute top-2 right-2 rounded bg-blue-600 px-2 py-1 text-xs text-white hover:bg-blue-700"
                >
                  Fullscreen
                </button>
              </>
            )}
            {fullScreenPollution && (
              <div className="fixed inset-0 z-50 bg-white">
                <MapContainer
                  center={[26.8, 83]}
                  zoom={6}
                  scrollWheelZoom={true}
                  className="h-full w-full"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    maxZoom={18}
                    attribution="&copy; OpenStreetMap contributors"
                  />
                  {cities.map((city, idx) => (
                    <CircleMarker
                      key={idx}
                      center={[city.lat, city.lon]}
                      radius={7}
                      pathOptions={{
                        color: zoneColors[city.zone] || "blue",
                        fillColor: zoneColors[city.zone] || "blue",
                        fillOpacity: 0.8,
                      }}
                    >
                      <Popup>
                        <strong>{city.name}</strong>
                        <br />
                        Zone: {city.zone}
                      </Popup>
                    </CircleMarker>
                  ))}
                </MapContainer>
                <button
                  onClick={closePollutionFullScreen}
                  className="fixed top-4 right-4 z-50 rounded bg-red-600 px-4 py-2 text-white"
                  style={{ zIndex: 9999 }}
                >
                  Close Fullscreen
                </button>
              </div>
            )}
          </div>
        )}

        {/* Biodiversity Data Map Section - with fullscreen toggle */}
        {!fullScreenSatellite && !fullScreenPollution && (
          <div className={`rounded-lg bg-white p-4 shadow relative ${fullScreenBiodiversity ? "col-span-3" : ""}`}>
            <h3 className="mb-2 text-lg font-semibold">Biodiversity Data Map</h3>
            {!fullScreenBiodiversity && (
              <>
                <div className="h-64 rounded-lg overflow-hidden">
                  <MapContainer
                    center={[25.0, 83.0]}
                    zoom={6}
                    scrollWheelZoom={true}
                    className="h-full w-full rounded-lg"
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution="&copy; OpenStreetMap contributors"
                    />
                    {gangaZones.map((zone, zoneIdx) =>
                      zone.points.map((point, pointIdx) => (
                        <CircleMarker
                          key={`${zoneIdx}-${pointIdx}`}
                          center={point}
                          radius={8}
                          pathOptions={{
                            color: "#333",
                            fillColor: getBiodiversityColor(zone.biodiversityLevel),
                            fillOpacity: 0.7,
                            weight: 1,
                            opacity: 1,
                          }}
                        >
                          <Popup>
                            <strong>Zone:</strong> {zone.name}
                            <br />
                            <strong>Biodiversity Level:</strong> {zone.biodiversityLevel}
                          </Popup>
                        </CircleMarker>
                      ))
                    )}
                    <BiodiversityLegend />
                  </MapContainer>
                </div>
                <button
                  onClick={openBiodiversityFullScreen}
                  className="absolute top-2 right-2 rounded bg-blue-600 px-2 py-1 text-xs text-white hover:bg-blue-700"
                >
                  Fullscreen
                </button>
              </>
            )}
            {fullScreenBiodiversity && (
              <div className="fixed inset-0 z-50 bg-white">
                <MapContainer
                  center={[25.0, 83.0]}
                  zoom={6}
                  scrollWheelZoom={true}
                  className="h-full w-full"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                  />
                  {gangaZones.map((zone, zoneIdx) =>
                    zone.points.map((point, pointIdx) => (
                      <CircleMarker
                        key={`${zoneIdx}-${pointIdx}`}
                        center={point}
                        radius={8}
                        pathOptions={{
                          color: "#333",
                          fillColor: getBiodiversityColor(zone.biodiversityLevel),
                          fillOpacity: 0.7,
                          weight: 1,
                          opacity: 1,
                        }}
                      >
                        <Popup>
                          <strong>Zone:</strong> {zone.name}
                          <br />
                          <strong>Biodiversity Level:</strong> {zone.biodiversityLevel}
                        </Popup>
                      </CircleMarker>
                    ))
                  )}
                  <BiodiversityLegend />
                </MapContainer>
                <button
                  onClick={closeBiodiversityFullScreen}
                  className="fixed top-4 right-4 z-50 rounded bg-red-600 px-4 py-2 text-white"
                  style={{ zIndex: 9999 }}
                >
                  Close Fullscreen
                </button>
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
}

export default Map;
