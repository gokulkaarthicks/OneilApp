import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import "./LineChartComponent.css";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const LineChartComponent = ({ data }) => {
    const chartData = {
        labels: Object.keys(data),
        datasets: [
            {
                label: "Mine Growth Over Time",
                data: Object.values(data),
                borderColor: "#3498db", // Vibrant blue
                backgroundColor: "rgba(52, 152, 219, 0.2)", // Soft blue transparent
                fill: true,
                tension: 0.4,
                pointBackgroundColor: "#1abc9c",
                pointBorderColor: "#16a085",
                pointBorderWidth: 2,
            },
        ],
    };

    return <div className="chart-container"><Line data={chartData} /></div>;
};

export default LineChartComponent;