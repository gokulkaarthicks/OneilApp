import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import "./PieChartComponent.css";

Chart.register(ArcElement, Tooltip, Legend);

const PieChartComponent = ({ data }) => {
    const chartData = {
        labels: Object.keys(data),
        datasets: [
            {
                data: Object.values(data),
                backgroundColor: ["#ffb347", "#ff7675", "#6ab04c"], // Orange, Red, Green
                borderColor: ["#e67e22", "#d63031", "#27ae60"], // Darker border for depth
                borderWidth: 2,
            },
        ],
    };

    return <div className="chart-container"><Pie data={chartData} /></div>;
};

export default PieChartComponent;