import { useEffect, useRef, useMemo } from "react";

import Chart from "../utils/chartSetup";

const UniversalChart = ({ type, x, y }) => {
  const chartRef = useRef(null);

  const color = "#c01e21";
  const yLabel = type === "bar" ? "Average rating" : "Number of submissions";

  const yTicks = useMemo(() => {
    return type === "bar"
      ? {
          stepSize: 1,
          min: 0,
          max: 5,
        }
      : undefined;
  }, [type]);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }

      chartRef.current.chartInstance = new Chart(ctx, {
        type,
        data: {
          labels: x,
          datasets: [
            {
              label: "",
              data: y,
              backgroundColor: color,
              borderColor: color,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              title: {
                display: true,
                text: yLabel,
              },
              beginAtZero: true,
              ticks: yTicks,
            },
          },
        },
      });
    }
  }, [type, x, y, yLabel, yTicks]);

  return <canvas ref={chartRef}></canvas>;
};

export default UniversalChart;
