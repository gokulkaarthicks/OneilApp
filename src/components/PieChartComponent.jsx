import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import "./PieChartComponent.css";

Chart.register(ArcElement, Tooltip, Legend);

const PieChartComponent = ({ data, title }) => {
    const chartData = {
        labels: Object.keys(data),
        datasets: [
            {
                data: Object.values(data),
                backgroundColor: ["#FF4500", "#1E90FF", "#32CD32", "#FFD700", "#FF69B4"],
                borderWidth: 2,
            },
        ],
    };

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
            <div style={{ width: "100%", height: "250px" }}>
                <Pie data={chartData} options={options} />
            </div>
        </div>
    );
};

export default PieChartComponent;