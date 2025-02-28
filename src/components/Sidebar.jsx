import React, { useState, useEffect } from "react";
import "./Sidebar.css";

const Sidebar = ({ states, minerals, companies, projects, filters, setFilters }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

    if (isMobile) {
        return (
            <div className="mobile-filter-container">
                <button className="mobile-filter-button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    🔍 Filter Mines
                </button>
                {isDropdownOpen && (
                    <div className="mobile-dropdown">
                        <label>State</label>
                        <select name="state" onChange={handleFilterChange} value={filters.state}>
                            <option value="All">All States</option>
                            {states.map((state, index) => (
                                <option key={index} value={state}>{state}</option>
                            ))}
                        </select>

                        <label>Mineral</label>
                        <select name="mineral" onChange={handleFilterChange} value={filters.mineral}>
                            <option value="All">All Minerals</option>
                            {minerals.map((mineral, index) => (
                                <option key={index} value={mineral}>{mineral}</option>
                            ))}
                        </select>

                        <label>Company</label>
                        <select name="company" onChange={handleFilterChange} value={filters.company}>
                            <option value="All">All Companies</option>
                            {companies.map((company, index) => (
                                <option key={index} value={company}>{company}</option>
                            ))}
                        </select>

                        <label>Project Type</label>
                        <select name="project" onChange={handleFilterChange} value={filters.project}>
                            <option value="All">All Projects</option>
                            {projects.map((project, index) => (
                                <option key={index} value={project}>{project}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="sidebar">
            <h3>Filter Mines</h3>

            <label>State</label>
            <select name="state" onChange={handleFilterChange} value={filters.state}>
                <option value="All">All States</option>
                {states.map((state, index) => (
                    <option key={index} value={state}>{state}</option>
                ))}
            </select>

            <label>Mineral</label>
            <select name="mineral" onChange={handleFilterChange} value={filters.mineral}>
                <option value="All">All Minerals</option>
                {minerals.map((mineral, index) => (
                    <option key={index} value={mineral}>{mineral}</option>
                ))}
            </select>

            <label>Company</label>
            <select name="company" onChange={handleFilterChange} value={filters.company}>
                <option value="All">All Companies</option>
                {companies.map((company, index) => (
                    <option key={index} value={company}>{company}</option>
                ))}
            </select>

            <label>Project Type</label>
            <select name="project" onChange={handleFilterChange} value={filters.project}>
                <option value="All">All Projects</option>
                {projects.map((project, index) => (
                    <option key={index} value={project}>{project}</option>
                ))}
            </select>
        </div>
    );
};

export default Sidebar;