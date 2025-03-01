import React, { useState, useEffect } from "react";
import "./Sidebar.css";

const Sidebar = ({ states, minerals, companies, projects, projectNames, filters, setFilters }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Store selected filters as an array
    const [selectedFilters, setSelectedFilters] = useState({
        state: [],
        mineral: [],
        company: [],
        project: [],
        projectName: [],
    });

    // Handle screen resizing
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1024);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Handle multi-select filter changes
    const handleFilterChange = (category, value) => {
        setSelectedFilters((prev) => {
            const newSelection = prev[category].includes(value)
                ? prev[category].filter((item) => item !== value) // Remove if already selected
                : [...prev[category], value]; // Add if not selected

            setFilters({ ...filters, [category]: newSelection.length ? newSelection : "All" });
            return { ...prev, [category]: newSelection };
        });
    };

    // Clear specific filter selection
    const clearFilter = (category) => {
        setSelectedFilters((prev) => ({ ...prev, [category]: [] }));
        setFilters({ ...filters, [category]: "All" });
    };

    // Render a multi-select dropdown filter
    const renderMultiSelect = (label, category, options) => (
        <div className="filter-group">
            <label>{label}</label>
            <div className="multi-select">
                <button className="multi-select-button" onClick={() => toggleDropdown(category)}>
                    {selectedFilters[category].length > 0 ? selectedFilters[category].join(", ") : `All ${label}s`} ▼
                </button>
                <div className={`multi-select-dropdown ${isDropdownOpen === category ? "open" : ""}`}>
                    {options.map((option, index) => (
                        <label key={index} className="multi-select-item">
                            <input
                                type="checkbox"
                                value={option}
                                checked={selectedFilters[category].includes(option)}
                                onChange={() => handleFilterChange(category, option)}
                            />
                            {option}
                        </label>
                    ))}
                    <button className="clear-button" onClick={() => clearFilter(category)}>Clear</button>
                </div>
            </div>
        </div>
    );

    // Toggle dropdown open state
    const toggleDropdown = (category) => {
        setIsDropdownOpen(isDropdownOpen === category ? null : category);
    };

    // Mobile Sidebar
    if (isMobile) {
        return (
            <div className="mobile-filter-container">
                <button className="mobile-filter-button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    🔍 Filter Mines
                </button>
                {isDropdownOpen && (
                    <div className="mobile-dropdown">
                        {renderMultiSelect("State", "state", states)}
                        {renderMultiSelect("Mineral", "mineral", minerals)}
                        {renderMultiSelect("Company", "company", companies)}
                        {renderMultiSelect("Project Type", "project", projects)}
                        {renderMultiSelect("Project Name", "projectName", projectNames)}
                    </div>
                )}
            </div>
        );
    }

    // Desktop Sidebar
    return (
        <div className="sidebar">
            <h3>Filter Mines</h3>
            {renderMultiSelect("State", "state", states)}
            {renderMultiSelect("Mineral", "mineral", minerals)}
            {renderMultiSelect("Company", "company", companies)}
            {renderMultiSelect("Project Type", "project", projects)}
            {renderMultiSelect("Project Name", "projectName", projectNames)}
        </div>
    );
};

export default Sidebar;