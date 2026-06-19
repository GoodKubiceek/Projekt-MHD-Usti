let map;
let marker;

// =====================
// MAPY (vrstvy)
// =====================

const lightMap = L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    { attribution: "© OpenStreetMap & CARTO" }
);

const darkMap = L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    { attribution: "© OpenStreetMap & CARTO" }
);

const aerialMap = L.tileLayer(
  "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
  { attribution: "google" }
);

// =====================
// MAPA INIT
// =====================

map = L.map('map', {
    layers: [lightMap]
}).setView(CONFIG.map.center, CONFIG.map.zoom);

// =====================
// VOZIDLO
// =====================

function createLineMarker(lineNumber, color) {
    return L.divIcon({
        className: 'line-marker',
        html: `
            <div class="marker-box" style="background:${color}">
                ${lineNumber}
            </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });
}

marker = L.marker(CONFIG.map.center, {
    icon: createLineMarker(76, "#0000D5")
}).addTo(map);

// =====================
// ZASTÁVKY
// =====================

const stops = [
    { name: "Všebořice 2", lat: 50.6890106, lng: 13.9926833, lines: "76" },
    { name: "Všebořice 1", lat: 50.6884347, lng: 13.9933825, lines: "76" },
    { name: "Na Kohoutě 1", lat: 50.6865197, lng: 13.9964875, lines: "76" },
    { name: "Na Kohoutě 2", lat: 50.6860542, lng: 13.9974603, lines: "76" },
    { name: "Dukelských hrdinů 1", lat: 50.6848944, lng: 13.9990978, lines: "76" },
    { name: "Dukelských hrdinů 2", lat: 50.6846161, lng: 13.9997989, lines: "76" },
    { name: "Kpt. Jaroše 1", lat: 50.6820642, lng: 14.0034075, lines: "76" },
    { name: "Kpt. Jaroše 2", lat: 50.6823350, lng: 14.0032406, lines: "76" },
    { name: "Bukov, rondel", lat: 50.6805192, lng: 14.0068750, lines: "76" },
    { name: "Bukov 1", lat: 50.6789933, lng: 14.0091878, lines: "76" },
    { name: "Bukov 2", lat: 50.6793481, lng: 14.0089997, lines: "76" },
    { name: "Zimní stadion", lat: 50.6768953, lng: 14.0129986, lines: "76" },
    { name: "Městský stadion 1", lat: 50.6763039, lng: 14.0141619, lines: "76" },
    { name: "Městský stadion 2", lat: 50.6749686, lng: 14.0157900, lines: "76" },
    { name: "Beethovenova 1", lat: 50.6728972, lng: 14.0198278, lines: "76" },
    { name: "Beethovenova 2", lat: 50.6731033, lng: 14.0198422, lines: "76" },
    { name: "Šaldova 1", lat: 50.6701469, lng: 14.0231906, lines: "76" },
    { name: "Šaldova 2", lat: 50.6697503, lng: 14.0243017, lines: "76" },
    { name: "Poliklinika 1", lat: 50.6663819, lng: 14.0304078, lines: "76" },
    { name: "Poliklinika 2", lat: 50.6675492, lng: 14.0287103, lines: "" },
    { name: "Poliklinika 3", lat: 50.6663933, lng: 14.0290061, lines: "76" },
    { name: "Hraničář 1", lat: 50.6635972, lng: 14.0330658, lines: "" },
    { name: "Hraničář 2", lat: 50.6630669, lng: 14.0334131, lines: "76" },
    { name: "Hraničář 3 ", lat: 50.6639747, lng: 14.0330258, lines: "76" },
    { name: "Hraničář 4 ", lat: 50.6632386, lng: 14.0335150, lines: "43, 46" },
    { name: "Hraničář 5", lat: 50.6618539, lng: 14.0342761, lines: "" },
    { name: "Hraničář 6", lat: 50.6622467, lng: 14.0333014, lines: "" },
    { name: "Divadlo 1", lat: 50.6601639, lng: 14.0353947, lines: "76" },
    { name: "Divadlo 2", lat: 50.6595306, lng: 14.0364417, lines: "76" },
    { name: "Divadlo 3", lat: 50.6595231, lng: 14.0359450, lines: "" },
    { name: "Divadlo 4", lat: 50.6594200, lng: 14.0359917, lines: "" },
    { name: "Divadlo 5", lat: 50.6603356, lng: 14.0353956, lines: "" },
    { name: "Divadlo 6", lat: 50.6594200, lng: 14.0364647, lines: "" },
    { name: "Divadlo 7", lat: 50.6595842, lng: 14.0346822, lines: "" },
    { name: "Divadlo 8", lat: 50.6595764, lng: 14.0344381, lines: "" },
    { name: "Revoluční 1", lat: 50.6595689, lng: 14.0372008, lines: "43, 46" },
    { name: "Revoluční 2", lat: 50.6595917, lng: 14.0377950, lines: "76" },
    { name: "Mírové náměstí 1", lat: 50.6599847, lng: 14.0406103, lines: "76" },
    { name: "Mírové náměstí 2", lat: 50.6601486, lng: 14.0411519, lines: "43, 46" },
    { name: "Mírové náměstí 3", lat: 50.6604767, lng: 14.0425519, lines: "" },
    { name: "Mírové náměstí 4", lat: 50.6605606, lng: 14.0432578, lines: "76, 43, 46" },
    { name: "stop", lat: 50, lng: 14, lines: "76" },
    { name: "stop", lat: 50, lng: 14, lines: "76" },
    { name: "stop", lat: 50, lng: 14, lines: "76" },
    { name: "stop", lat: 50, lng: 14, lines: "76" },
    { name: "stop", lat: 50, lng: 14, lines: "76" },
];

const stopIcon = L.icon({
    iconUrl: './blob/main/Stop_ico.png',
    iconSize: [24, 24],
    iconAnchor: [12, 12]
});

// =====================
// CLUSTER
// =====================

const stopCluster = L.markerClusterGroup({
    disableClusteringAtZoom: 17,
    maxClusterRadius: 40,

    iconCreateFunction: function (cluster) {
        const count = cluster.getChildCount();

        let t = (count - 2) / (50 - 2);
        t = Math.max(0, Math.min(1, t));

        const r = 0;
        const g = Math.round(80 + (200 - 80) * t);
        const b = Math.round(255 + (80 - 255) * t);

        const color = `rgb(${r},${g},${b})`;

        return L.divIcon({
            html: `
                <div class="cluster-circle" style="background:${color}">
                    ${count}
                </div>
            `,
            className: "custom-cluster",
            iconSize: L.point(40, 40)
        });
    }
});

// add stops
stops.forEach(stop => {
    const stopMarker = L.marker([stop.lat, stop.lng], { icon: stopIcon });

    stopMarker.bindPopup(`
        <div style="min-width:150px">
            <b>${stop.name}</b><br>
            Linky: ${stop.lines}
        </div>
    `);

    stopCluster.addLayer(stopMarker);
});

map.addLayer(stopCluster);

// =====================
// SETTINGS UI
// =====================

let settingsOpen = false;

const settingsControl = L.control({ position: "bottomleft" });

settingsControl.onAdd = function () {
    const div = L.DomUtil.create("div", "settings-wrapper");

    div.innerHTML = `
        <div class="settings-button" id="settingsBtn">⚙️</div>

        <div class="settings-panel" id="settingsPanel">
            <div class="settings-title">Nastavení</div>

            <label class="settings-item">
                <input type="checkbox" id="toggleStops" checked>
                <span>Zastávky</span>
            </label>

            <label class="settings-item">
                <input type="checkbox" id="toggleVehicle" checked>
                <span>Vozidla</span>
            </label>

            <div class="settings-divider"></div>

            <div class="settings-label">Mapa</div>
            <select id="mapStyle" class="settings-select">
                <option value="light">Světlá</option>
                <option value="dark">Tmavá</option>
                <option value="aerial">Letecká</option>
            </select>
        </div>
    `;

    L.DomEvent.disableClickPropagation(div);
    return div;
};

settingsControl.addTo(map);

// open/close
document.addEventListener("click", (e) => {
    if (e.target.id === "settingsBtn") {
        const panel = document.getElementById("settingsPanel");
        settingsOpen = !settingsOpen;
        panel.classList.toggle("open", settingsOpen);
    }
});

// =====================
// TOGGLES
// =====================

// stops
document.addEventListener("change", (e) => {
    if (e.target.id === "toggleStops") {
        if (e.target.checked) map.addLayer(stopCluster);
        else map.removeLayer(stopCluster);
    }
});

// vehicle
document.addEventListener("change", (e) => {
    if (e.target.id === "toggleVehicle") {
        if (e.target.checked) map.addLayer(marker);
        else map.removeLayer(marker);
    }
});

// map switch
document.addEventListener("change", (e) => {
    if (e.target.id === "mapStyle") {

        map.removeLayer(lightMap);
        map.removeLayer(darkMap);
        map.removeLayer(aerialMap);

        if (e.target.value === "light") lightMap.addTo(map);
        if (e.target.value === "dark") darkMap.addTo(map);
        if (e.target.value === "aerial") aerialMap.addTo(map);
    }
});

// =====================
// WEBSOCKET
// =====================

const socket = new WebSocket(CONFIG.wsUrl);

socket.onopen = () => {
    console.log("WebSocket connected");
};

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (!data.lat || !data.lng) return;

    marker.setLatLng([data.lat, data.lng]);

    if (data.line) {
        marker.setIcon(
            createLineMarker(data.line, data.color || "#ff3b30")
        );
    }
};

socket.onerror = (err) => {
    console.log("WebSocket error:", err);
};
