import Chart from "chart.js/auto";
import { useEffect } from "react";

export default function useChart(chartRef, chartType, data, options) {
  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = new Chart(chartRef.current, {
        type: chartType,
        data,
        options,
      });

      return () => {
        chartInstance.destroy();
      };
    }
  }, [chartRef, chartType, data, options]);
}
