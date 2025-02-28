import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import "./ChartComponent.css";

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ChartComponent = ({ data }) => {
    const chartData = {
        labels: Object.keys(data),
        datasets: [
            {
                label: "Number of Mines",
                data: Object.values(data),
                backgroundColor: ["#3498db", "#ff5733", "#2ecc71"], // Blue, Orange, Green
                borderColor: ["#2980b9", "#c0392b", "#27ae60"], // Darker shades for depth
                borderWidth: 2,
                borderRadius: 5,
            },
        ],
    };

    return <div className="chart-container"><Bar data={chartData} /></div>;
};

export default ChartComponent;