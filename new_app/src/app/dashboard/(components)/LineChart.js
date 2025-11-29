"use client";

import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

export default function BarChart({ data, label }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return; // prevent null access

    const ctx = canvasRef.current.getContext("2d");

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map((row) => row.x),
        datasets: [
          {
            label: label,
            data: data.map((row) => row.y),
            backgroundColor: "rgba(75, 192, 192, 0.5)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true },
        },
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
