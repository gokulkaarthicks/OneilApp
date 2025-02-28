import React, { useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import "./LineChartComponent.css";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const LineChartComponent = ({ data, title }) => {

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
            <Line data={{
                labels: Object.keys(data),
                datasets: [{
                    label: title,
                    data: Object.values(data),
                    borderColor: "#00BFFF",
                    backgroundColor: "rgba(0, 191, 255, 0.2)",
                    fill: true,
                    tension: 0.4,
                }]
            }} />
        </div>
    );
};

export default LineChartComponent;