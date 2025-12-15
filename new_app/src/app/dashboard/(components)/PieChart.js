"use client";

import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

export default function PieChart({ data, label }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return; // prevent null access

    const ctx = canvasRef.current.getContext("2d");

    const chart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: data.map((row) => row.name),
        datasets: [
          {
            label: label,
            data: data.map((row) => row.val),
            backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"], // Dataset of colours from stack overflow: https://stackoverflow.com/questions/28828915/how-set-color-family-to-pie-chart-in-chart-js
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    return () => chart.destroy();
  }, [data]);

  return (
    <div className="w-full h-56 sm:h-64 md:h-80 lg:h-96">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
