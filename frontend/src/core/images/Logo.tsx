import type { SVGProps } from "react";

const Logo: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="48"
    height="49"
    viewBox="0 0 48 49"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      y="0.5"
      width="48"
      height="48"
      rx="10"
      fill="url(#paint0_linear_2017_266)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_2017_266"
        x1="24"
        y1="0.5"
        x2="24"
        y2="48.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4E9FF8" stopOpacity="1" />
        <stop offset="0.9999" stopColor="#1685FD" stopOpacity="1" />
        <stop offset="1" stopColor="#007AFF" stopOpacity="1" />
      </linearGradient>
    </defs>
  </svg>
);

export default Logo;
