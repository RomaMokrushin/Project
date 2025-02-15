import type { SVGProps } from "react";

const SquigglyLine: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    version="1.1"
    id="squiggly-line-reversed-svg"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 92.8 12"
    enableBackground="0 0 92.8 12"
    xmlSpace="preserve"
    {...props}
  >
    <path
      style={{
        fill: "none",
        stroke: "#007aff",
        strokeWidth: 4,
        strokeMiterlimit: 10,
        strokeDasharray: 100,
        animation: "squiggle1 3s linear infinite",
      }}
      d="M1.4,6c0,0,9-9,18,0s18,0,18,0s9-9,18,0s18,0,18,0s9-9,18,0"
    />
    <style>
      {`
   @keyframes squiggle1 {
     to {
       stroke-dashoffset: 200;
     }
   }
 `}
    </style>
  </svg>
);

export default SquigglyLine;
