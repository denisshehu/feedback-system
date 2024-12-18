import {
  Chart,
  BarController,
  LineController,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  BarController,
  LineController,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

Chart.defaults.font.family = "'Parkinsans', sans-serif";
Chart.defaults.font.size = 16;
Chart.defaults.font.weight = 300;
Chart.defaults.color = "#000";

export default Chart;
