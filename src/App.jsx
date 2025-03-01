import React, { useState } from "react";
import MapComponent from "./components/MapComponent";
import ChartComponent from "./components/ChartComponent";
import PieChartComponent from "./components/PieChartComponent";
import LineChartComponent from "./components/LineChartComponent";
import Sidebar from "./components/Sidebar";
import "./App.css";

// **📍 Define approximate lat/lng boundaries for each state**
const stateCoordinates = {
    "California": { lat: [32.5, 42.0], lng: [-124.4, -114.1] },
    "Nevada": { lat: [35.0, 42.0], lng: [-120.0, -114.0] },
    "Arizona": { lat: [31.3, 37.0], lng: [-114.8, -109.0] },
    "Texas": { lat: [25.8, 36.5], lng: [-106.6, -93.5] },
    "Colorado": { lat: [37.0, 41.0], lng: [-109.0, -102.0] },
    "New Mexico": { lat: [31.3, 37.0], lng: [-109.0, -103.0] },
    "Montana": { lat: [44.4, 49.0], lng: [-116.0, -104.0] },
    "Wyoming": { lat: [41.0, 45.0], lng: [-111.0, -104.0] },
    "Oregon": { lat: [42.0, 46.3], lng: [-124.6, -116.5] },
    "Utah": { lat: [37.0, 42.0], lng: [-114.1, -109.0] },
};

// Fixed lists for filtering
const states = Object.keys(stateCoordinates);
const minerals = ["Gold", "Coal", "Copper", "Silver", "Uranium", "Iron", "Zinc", "Nickel", "Platinum", "Lithium"];
const companies = ["MiningCorp", "GoldDiggers Ltd.", "MetalX Corp", "Steel Industries", "SilverStream", "RefineryX", "Nuclear Resources", "GeoMines", "DeepDrill Inc.", "Earth Extractors"];
const projects = ["Exploration", "Extraction", "Processing", "Refining", "Surveying"];
const types = ["Active", "Abandoned", "Reclaimed"];

// **📌 Function to generate a location within the state's boundary**
const generateLocation = (state) => {
    if (!stateCoordinates[state]) return { lat: 39.5, lng: -98.35 }; // Default to central U.S. if state is missing
    const { lat, lng } = stateCoordinates[state];
    return {
        lat: lat[0] + Math.random() * (lat[1] - lat[0]),
        lng: lng[0] + Math.random() * (lng[1] - lng[0]),
    };
};

// **📌 Generate 100 diverse mining projects with realistic locations**
const generateMiningData = () => {
    let miningData = [];
    for (let i = 1; i <= 100; i++) {
        const state = states[Math.floor(Math.random() * states.length)];
        const location = generateLocation(state);
        miningData.push({
            name: `Mine ${i}`,
            lat: location.lat,
            lng: location.lng,
            state: state,
            mineral: minerals[Math.floor(Math.random() * minerals.length)],
            company: companies[Math.floor(Math.random() * companies.length)],
            project: projects[Math.floor(Math.random() * projects.length)],
            type: types[Math.floor(Math.random() * types.length)],
            yearOpened: 1990 + Math.floor(Math.random() * 35), // Random year from 1990 to 2024
        });
    }
    return miningData;
};

const coalMinesData = generateMiningData();

// Unique filter options
const statesList = ["All", ...states];
const mineralsList = ["All", ...new Set(coalMinesData.map(mine => mine.mineral))];
const companiesList = ["All", ...new Set(coalMinesData.map(mine => mine.company))];
const projectsList = ["All", ...projects];

function App() {
    const [filters, setFilters] = useState({
        state: "All",
        mineral: "All",
        company: "All",
        project: "All"
    });

    const [searchQuery, setSearchQuery] = useState("");

    // **📌 Filtering mines based on user selection**
    const filteredMines = coalMinesData.filter(mine => 
        (filters.state === "All" || mine.state === filters.state) &&
        (filters.mineral === "All" || mine.mineral === filters.mineral) &&
        (filters.company === "All" || mine.company === filters.company) &&
        (filters.project === "All" || mine.project === filters.project) &&
        (searchQuery === "" || mine.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    // **📊 Data for Visualizations**
    const mineralsCount = {};
    filteredMines.forEach(mine => {
        mineralsCount[mine.mineral] = (mineralsCount[mine.mineral] || 0) + 1;
    });

    const projectsCount = {};
    filteredMines.forEach(mine => {
        projectsCount[mine.project] = (projectsCount[mine.project] || 0) + 1;
    });

    const mineTrends = {};
    filteredMines.forEach(mine => {
        mineTrends[mine.yearOpened] = (mineTrends[mine.yearOpened] || 0) + 1;
    });

    return (
        <div className="app-container">
            <Sidebar 
                states={statesList} 
                minerals={mineralsList} 
                companies={companiesList} 
                projects={projectsList} 
                filters={filters} 
                setFilters={setFilters} 
            />
            <div className="map-visualization-container">
                <MapComponent coalMines={filteredMines} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <div className="visualizations">
                    <ChartComponent data={mineralsCount} title="Mines Per Mineral Type" />
                    <PieChartComponent data={projectsCount} title="Mine Distribution by Project Type" />
                    <LineChartComponent data={mineTrends} title="Mines Opened Over Time" />
                </div>
            </div>
        </div>
    );
}

export default App;