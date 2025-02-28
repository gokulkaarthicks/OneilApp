import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import "./ChartComponent.css";

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ChartComponent = ({ data, title }) => {

    const options = {
        maintainAspectRatio: false, // Allows controlled height
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    font: { size: 12 },
                },
            },
        },
    };

    return (
        <div className="chart-container">
            <h3>{title}</h3>
            <Bar data={{
                labels: Object.keys(data),
                datasets: [{
                    label: title,
                    data: Object.values(data),
                    backgroundColor: ["#1E90FF", "#FF4500", "#32CD32", "#FFD700", "#FF69B4"],
                    borderColor: ["#0056b3", "#c0392b", "#228B22", "#B8860B", "#C71585"],
                    borderWidth: 2,
                }]
            }} />
        </div>
    );
};

export default ChartComponent;