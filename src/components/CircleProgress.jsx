import React, { useEffect, useState } from "react";

function CircleProgress({ percentage, className = "" }) {
  const strokeWidth = 3;
  const defaultRadius = 15;
  const radius = defaultRadius;
  const circumference = 2 * Math.PI * radius;

  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    // Start with empty circle (0%)
    setOffset(circumference - (0 / 100) * circumference);

    // Animate to actual percentage after a brief delay
    const timer = setTimeout(() => {
      setOffset(circumference - (percentage / 100) * circumference);
    }, 100);

    return () => clearTimeout(timer);
  }, [percentage, circumference]);

  const getStrokeColor = () => {
    if (percentage > 80) return "#71F170";
    else if (percentage >= 70) return "#FFC008";
    else return "#DF212B";
  };

  return (
    <svg
      className={`w-[80px] h-[80px] ${className}`}
      viewBox="0 0 50 50"
      preserveAspectRatio="xMidYMid meet"
    >
      <g transform="rotate(-90 25 25)">
        <circle
          cx="25"
          cy="25"
          r={radius}
          fill="transparent"
          stroke={getStrokeColor()}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="butt"
          className="transition-all duration-1000 ease-out"
        />
      </g>
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="text-[13px] max-[375px]:text-[12px] fill-white dark:fill-black font-medium"
      >
        {percentage}
      </text>
    </svg>
  );
}

export default CircleProgress;
