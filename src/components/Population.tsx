import { colors } from "../styles/chartColor";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface PopulationProps {
  prefectureProps: string[];
  totalPopulationProps: { year: string; value: number }[][];
}

export default function Population({
  prefectureProps,
  totalPopulationProps,
}: PopulationProps) {
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "総人口",
      },
    },
  };
  if (
    !totalPopulationProps ||
    totalPopulationProps.length === 0 ||
    totalPopulationProps.some((data) => !data)
  ) {
    return <div>※都道府県を選択してください。</div>;
  }

  const datasets = prefectureProps.map((prefecture, index) => {
    const currentPopulationData = totalPopulationProps[index];

    return {
      label: prefecture,
      data: currentPopulationData
        ? currentPopulationData.map((data) => data.value)
        : [],
      fill: false,
      backgroundColor: currentPopulationData
        ? colors[index].backgroundColor
        : "rgba(255, 255, 255, 0.4)",
      borderColor: currentPopulationData
        ? colors[index].borderColor
        : "rgba(255, 255, 255, 1)",
      tension: 0.1,
    };
  });

  const data = {
    labels: totalPopulationProps[0].map((data) => data.year),
    datasets: datasets,
  };

  return <Line data={data} options={options} />;
}
