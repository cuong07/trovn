/* eslint-disable react/prop-types */
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { optionsPieChart } from "@/configs/chart";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ labels, data, label }) {
    const dataValues = {
        labels,
        datasets: [
            {
                label,
                data,
                backgroundColor: [
                    "#FF5733",
                    "#4A90E2",
                    "#9B59B6",
                    "#F1C40F",
                    "#2ECC71",
                    "#3498DB",
                    "#E74C3C",
                    "#1ABC9C",
                    "#E67E22",
                    "#34495E",
                    "#D35400",
                ],

                borderWidth: 1,
            },
        ],
    };
    return <Pie data={dataValues} width={"100%"} options={optionsPieChart} />;
}

export default PieChart;
