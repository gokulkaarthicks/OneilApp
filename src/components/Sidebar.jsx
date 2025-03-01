import React, { useState, useEffect } from "react";
import "./Sidebar.css";

const Sidebar = ({ states, minerals, companies, projects, filters, setFilters }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Handle screen resizing
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1024);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    // Mobile Sidebar with Dropdown
    if (isMobile) {
        return (
            <div className="mobile-filter-container">
                <button className="mobile-filter-button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    🔍 Filter Mines
                </button>
                {isDropdownOpen && (
                    <div className="mobile-dropdown">
                        {renderFilter("State", "state", states)}
                        {renderFilter("Mineral", "mineral", minerals)}
                        {renderFilter("Company", "company", companies)}
                        {renderFilter("Project Type", "project", projects)}
                    </div>
                )}
            </div>
        );
    }

    // Desktop Sidebar
    return (
        <div className="sidebar">
            <h3>Filter Mines</h3>
            {renderFilter("State", "state", states)}
            {renderFilter("Mineral", "mineral", minerals)}
            {renderFilter("Company", "company", companies)}
            {renderFilter("Project Type", "project", projects)}
        </div>
    );

    function renderFilter(label, name, options) {
        return (
            <div className="filter-group">
                <label>{label}</label>
                <select name={name} onChange={handleFilterChange} value={filters[name]}>
                    <option value="All">{label}</option>
                    {options.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
                </select>
            </div>
        );
    }
};

export default Sidebar;