import React, { useState } from "react";
import MapComponent from "./components/MapComponent";
import ChartComponent from "./components/ChartComponent";
import PieChartComponent from "./components/PieChartComponent";
import LineChartComponent from "./components/LineChartComponent";
import Sidebar from "./components/Sidebar";
import "./App.css";

// Dummy data with diversity
const coalMinesData = [
    { name: "Mine A", lat: 37.7749, lng: -122.4194, state: "California", mineral: "Coal", company: "MiningCorp", project: "Exploration", type: "Active", yearOpened: 2015 },
    { name: "Mine B", lat: 34.0522, lng: -118.2437, state: "California", mineral: "Gold", company: "GoldDiggers Ltd.", project: "Extraction", type: "Abandoned", yearOpened: 2005 },
    { name: "Mine C", lat: 40.7128, lng: -74.0060, state: "New York", mineral: "Iron", company: "Steel Industries", project: "Processing", type: "Reclaimed", yearOpened: 2010 },
    { name: "Mine D", lat: 41.8781, lng: -87.6298, state: "Illinois", mineral: "Copper", company: "MetalX Corp", project: "Exploration", type: "Active", yearOpened: 2018 },
    { name: "Mine E", lat: 39.7392, lng: -118.9903, state: "Colorado", mineral: "Coal", company: "MiningCorp", project: "Refining", type: "Abandoned", yearOpened: 2000 },
    { name: "Mine F", lat: 35.6895, lng: -105.9378, state: "New Mexico", mineral: "Silver", company: "SilverStream", project: "Extraction", type: "Active", yearOpened: 2021 },
    { name: "Mine G", lat: 32.7767, lng: -96.7970, state: "Texas", mineral: "Uranium", company: "Nuclear Resources", project: "Processing", type: "Reclaimed", yearOpened: 2012 },
    { name: "Mine H", lat: 36.7783, lng: -119.4179, state: "California", mineral: "Platinum", company: "MetalWorks", project: "Exploration", type: "Active", yearOpened: 2016 },
];

// Unique filter options
const states = ["All", ...new Set(coalMinesData.map(mine => mine.state))];
const minerals = ["All", ...new Set(coalMinesData.map(mine => mine.mineral))];
const companies = ["All", ...new Set(coalMinesData.map(mine => mine.company))];
const projects = ["All", "Exploration", "Extraction", "Processing", "Refining", "Surveying"]; // Fixed categories

function App() {
    const [filters, setFilters] = useState({
        state: "All",
        mineral: "All",
        company: "All",
        project: "All"
    });

    const [searchQuery, setSearchQuery] = useState("");

    // Filter mines based on selection & search query
    const filteredMines = coalMinesData.filter(mine => 
        (filters.state === "All" || mine.state === filters.state) &&
        (filters.mineral === "All" || mine.mineral === filters.mineral) &&
        (filters.company === "All" || mine.company === filters.company) &&
        (filters.project === "All" || mine.project === filters.project) &&
        (searchQuery === "" || mine.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    // **Bar Chart Data:** Number of mines per mineral type
    const mineralsCount = {};
    filteredMines.forEach(mine => {
        mineralsCount[mine.mineral] = (mineralsCount[mine.mineral] || 0) + 1;
    });

    // **Pie Chart Data:** Distribution by project type
    const projectsCount = {};
    filteredMines.forEach(mine => {
        projectsCount[mine.project] = (projectsCount[mine.project] || 0) + 1;
    });

    // **Line Chart Data:** Mines opened per year (historical trend)
    const mineTrends = {};
    filteredMines.forEach(mine => {
        mineTrends[mine.yearOpened] = (mineTrends[mine.yearOpened] || 0) + 1;
    });

    return (
        <div className="app-container">
            <Sidebar 
                states={states} 
                minerals={minerals} 
                companies={companies} 
                projects={projects} 
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