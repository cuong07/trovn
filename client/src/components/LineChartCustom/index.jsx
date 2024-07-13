/* eslint-disable react/prop-types */

import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from "chart.js";
import { options } from "@/configs/chart";

function LineChartCustom({ labels, data, label }) {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Filler,
        Legend
    );

    const dataValues = {
        labels,
        datasets: [
            {
                label,
                fill: true,
                data,
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
                borderWidth: 2,
            },
        ],
    };

    return (
        <Line
            options={options}
            data={dataValues}
            xAxis={[{ data: labels }]}
            series={[
                {
                    data,
                },
            ]}
            width={500}
            height={300}
        />
    );
}

export default LineChartCustom;
